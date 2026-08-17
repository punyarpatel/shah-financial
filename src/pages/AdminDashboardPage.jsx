import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import supabase from '../lib/supabase';
import api from '../lib/api';
import PhoneNumberField from '../components/PhoneNumberField';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [submittingNote, setSubmittingNote] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: '',
    phone: '',
    city: '',
    interest: '',
    isNri: 'No: I am based in India',
    message: ''
  });
  const [creatingLead, setCreatingLead] = useState(false);
  const [createError, setCreateError] = useState('');
  const [deletingLead, setDeletingLead] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterInterest, setFilterInterest] = useState('');
  const [filterNri, setFilterNri] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showCharts, setShowCharts] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const showToast = (message, type = 'success', action = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, action ? 7000 : 3500);
  };

  const fetchLeads = async () => {
    try {
      const [sbRes, apiRes] = await Promise.allSettled([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        api.get('/api/leads')
      ]);
      
      let rawLeads = [];
      if (sbRes.status === 'fulfilled' && sbRes.value.data) {
        rawLeads = [...rawLeads, ...sbRes.value.data];
      }
      if (apiRes.status === 'fulfilled' && apiRes.value.data) {
        rawLeads = [...rawLeads, ...apiRes.value.data];
      }
      
      // Deduplicate leads by id
      const leadMap = new Map();
      rawLeads.forEach(lead => {
        if (!leadMap.has(lead.id)) {
          leadMap.set(lead.id, lead);
        }
      });
      const allLeads = Array.from(leadMap.values());
      allLeads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setLeads((prevLeads) => {
        if (prevLeads.length === 0) return allLeads;
        return allLeads.map((newLead) => {
          const exists = prevLeads.some((oldLead) => oldLead.id === newLead.id);
          return exists ? newLead : { ...newLead, isNewHighlight: true };
        });
      });
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async (leadId) => {
    setLoadingNotes(true);
    try {
      let fetchedNotes = [];

      // 1. Try Express backend API
      try {
        const res = await api.get(`/api/leads/${leadId}/notes`);
        if (Array.isArray(res.data)) {
          fetchedNotes = res.data;
        }
      } catch (e) {
        // Ignored fallback
      }

      // 2. Try Supabase lead_notes table
      try {
        const { data: sbNotes } = await supabase.from('lead_notes').select('*').eq('lead_id', leadId);
        if (Array.isArray(sbNotes)) {
          fetchedNotes = [...fetchedNotes, ...sbNotes];
        }
      } catch (e) {
        // Ignored fallback
      }

      // 3. Persistent LocalStorage Backup
      const localKey = `dw_lead_notes_${leadId}`;
      const localNotes = JSON.parse(localStorage.getItem(localKey) || '[]');

      // Merge and deduplicate all notes by ID
      const notesMap = new Map();
      [...fetchedNotes, ...localNotes].forEach(note => {
        if (note && note.id) {
          notesMap.set(note.id, note);
        }
      });

      const mergedNotes = Array.from(notesMap.values());
      mergedNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setNotes(mergedNotes);
    } catch (err) {
      console.error('Error fetching notes:', err);
      const localKey = `dw_lead_notes_${leadId}`;
      const localNotes = JSON.parse(localStorage.getItem(localKey) || '[]');
      setNotes(localNotes);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    const noteText = newNoteText.trim();
    const leadId = selectedLead.id;
    setSubmittingNote(true);

    const newNoteObj = {
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      lead_id: leadId,
      text: noteText,
      created_at: new Date().toISOString()
    };

    try {
      // 1. Save to LocalStorage immediately (guaranteed instant persistence)
      const localKey = `dw_lead_notes_${leadId}`;
      const existingLocal = JSON.parse(localStorage.getItem(localKey) || '[]');
      const updatedLocal = [newNoteObj, ...existingLocal];
      localStorage.setItem(localKey, JSON.stringify(updatedLocal));

      // 2. Optimistic state update
      setNotes((prev) => [newNoteObj, ...prev]);
      setNewNoteText('');

      // 3. Background sync to Express API and Supabase (fire-and-forget safely)
      (async () => {
        try {
          if (api) await api.post(`/api/leads/${leadId}/notes`, { text: noteText }).catch(() => {});
        } catch (e) {}
        try {
          if (supabase && typeof supabase.from === 'function') {
            await supabase.from('lead_notes').insert([{
              id: newNoteObj.id,
              lead_id: leadId,
              text: noteText,
              created_at: newNoteObj.created_at
            }]).catch(() => {});
          }
        } catch (e) {}
      })();

      showToast('Follow-up note added', 'success');
    } catch (err) {
      console.error('Error adding note:', err);
      showToast('Failed to add note', 'error');
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!selectedLead || !noteId) return;
    const leadId = selectedLead.id;

    // 1. Remove from local state immediately
    setNotes((prev) => prev.filter((n) => n.id !== noteId));

    // 2. Remove from LocalStorage
    const localKey = `dw_lead_notes_${leadId}`;
    const existingLocal = JSON.parse(localStorage.getItem(localKey) || '[]');
    const updatedLocal = existingLocal.filter((n) => n.id !== noteId);
    localStorage.setItem(localKey, JSON.stringify(updatedLocal));

    // 3. Background sync to Express API and Supabase
    (async () => {
      try {
        if (api) await api.delete(`/api/leads/${leadId}/notes/${noteId}`).catch(() => {});
      } catch (e) {}
      try {
        if (supabase && typeof supabase.from === 'function') {
          await supabase.from('lead_notes').delete().eq('id', noteId).catch(() => {});
        }
      } catch (e) {}
    })();

    showToast('Note deleted', 'success');
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    fetchNotes(lead.id);
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    const { name, phone, city, interest, isNri, message } = createFormData;

    // Validate inputs
    if (!name.trim() || !phone.trim() || !city.trim() || !interest) {
      setCreateError('Please fill out all required fields');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setCreateError('Phone number must have at least 10 digits');
      return;
    }

    setCreateError('');
    setCreatingLead(true);

    try {
      const newLeadData = {
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        interest,
        is_nri: isNri,
        nri_country: isNri.startsWith('Yes') ? isNri.replace('Yes: ', '') : '',
        message: message.trim(),
        status: 'new',
        created_at: new Date().toISOString()
      };

      // 1. Insert into Supabase
      const sbPromise = supabase.from('leads').insert([newLeadData]);

      // 2. Insert into Local Express Backend
      const apiPromise = api.post('/api/leads', {
        name: newLeadData.name,
        phone: newLeadData.phone,
        city: newLeadData.city,
        interest: newLeadData.interest,
        isNri: newLeadData.is_nri,
        nriCountry: newLeadData.nri_country,
        message: newLeadData.message
      });

      await Promise.allSettled([sbPromise, apiPromise]);

      // Close modal & reset form
      setIsCreateModalOpen(false);
      setCreateFormData({
        name: '',
        phone: '',
        city: '',
        interest: '',
        isNri: 'No: I am based in India',
        message: ''
      });
      
      // Refresh leads list
      fetchLeads();
      showToast('Lead created successfully', 'success');
    } catch (err) {
      console.error('Error creating lead:', err);
      setCreateError('An error occurred while creating the lead. Please try again.');
      showToast('Failed to create lead', 'error');
    } finally {
      setCreatingLead(false);
    }
  };

  const handleRestoreLead = async (leadId, restoreStatus = 'new') => {
    try {
      const sbPromise = supabase.from('leads').update({ status: restoreStatus }).eq('id', leadId);
      const apiPromise = api.patch(`/api/leads/${leadId}`, { status: restoreStatus }).catch(() => {});
      await Promise.allSettled([sbPromise, apiPromise]);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, status: restoreStatus } : null);
      }
      fetchLeads();
      showToast('Lead restored successfully', 'success');
    } catch (err) {
      console.error('Error restoring lead:', err);
      showToast('Failed to restore lead', 'error');
    }
  };

  const handleBulkRestore = async (leadStatusMap) => {
    try {
      await Promise.allSettled(
        leadStatusMap.map(({ id, prevStatus }) =>
          Promise.allSettled([
            supabase.from('leads').update({ status: prevStatus }).eq('id', id),
            api.patch(`/api/leads/${id}`, { status: prevStatus }).catch(() => {})
          ])
        )
      );
      fetchLeads();
      showToast('Leads restored successfully', 'success');
    } catch (err) {
      console.error('Error restoring bulk leads:', err);
      showToast('Failed to restore leads', 'error');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.size === 0) return;
    setBulkDeleting(true);
    try {
      const ids = Array.from(selectedLeads);
      const leadStatusMap = ids.map(id => ({
        id,
        prevStatus: leads.find(l => l.id === id)?.status || 'new'
      }));

      await supabase.from('leads').update({ status: 'archived' }).in('id', ids);
      await Promise.allSettled(
        ids.map(id => api.patch(`/api/leads/${id}`, { status: 'archived' }).catch(() => {}))
      );
      setSelectedLeads(new Set());
      fetchLeads();

      showToast(`${ids.length} lead${ids.length > 1 ? 's' : ''} moved to Trash`, 'success', {
        label: '↺ Undo',
        onClick: () => handleBulkRestore(leadStatusMap)
      });
    } catch (err) {
      console.error('Error bulk archiving:', err);
      showToast('Failed to archive leads', 'error');
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!leadId) return;
    const targetLead = leads.find(l => l.id === leadId);
    const originalStatus = targetLead?.status || 'new';
    
    setDeletingLead(true);
    try {
      const sbPromise = supabase.from('leads').update({ status: 'archived' }).eq('id', leadId);
      const apiPromise = api.patch(`/api/leads/${leadId}`, { status: 'archived' }).catch(() => {});
      
      await Promise.allSettled([sbPromise, apiPromise]);
      
      setSelectedLead(null);
      fetchLeads();

      showToast('Lead moved to Trash', 'success', {
        label: '↺ Undo',
        onClick: () => handleRestoreLead(leadId, originalStatus)
      });
    } catch (err) {
      console.error('Error deleting lead:', err);
      showToast('Failed to archive lead', 'error');
    } finally {
      setDeletingLead(false);
    }
  };

  useEffect(() => {
    const checkSessionAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      fetchLeads();
    };
    checkSessionAndFetch();
  }, [navigate]);

  useEffect(() => {
    const channel = supabase
      .channel('leads-realtime-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterInterest, filterNri, itemsPerPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleExportCSV = () => {
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('CSV exported successfully', 'success');
  };

  const handleStatusUpdate = async (leadId, newStatus) => {
    // Optimistic UI update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    
    // Try updating Supabase first (if it's a UUID, it might be in Supabase or Node)
    // We will blindly try both APIs for the update since we merged the data.
    try {
      await supabase.from('leads').update({ status: newStatus }).eq('id', leadId);
      await api.patch(`/api/leads/${leadId}`, { status: newStatus }).catch(() => {});
      showToast('Lead status updated successfully', 'success');
    } catch (err) {
      console.error('Error updating status:', err);
      showToast('Failed to update status', 'error');
    } finally {
      fetchLeads();
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'new': return { color: '#c9922a', backgroundColor: 'rgba(201, 146, 42, 0.1)' };
      case 'called': return { color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' };
      case 'converted': return { color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' };
      case 'not interested': return { color: '#6b7280', backgroundColor: 'rgba(107, 114, 128, 0.1)' };
      case 'archived':
      case 'deleted': return { color: '#dc2626', backgroundColor: 'rgba(220, 38, 38, 0.1)' };
      default: return { color: '#c9922a', backgroundColor: 'rgba(201, 146, 42, 0.1)' }; // default to new
    }
  };

  const filteredLeads = leads.filter(lead => {
    const search = searchTerm.toLowerCase();
    const nameMatch = (lead.name || '').toLowerCase().includes(search);
    const phoneMatch = (lead.phone || '').toLowerCase().includes(search);
    const textMatch = nameMatch || phoneMatch;

    let statusMatch = false;
    if (filterStatus === 'archived') {
      statusMatch = lead.status === 'archived' || lead.status === 'deleted';
    } else if (filterStatus) {
      statusMatch = (lead.status || 'new') === filterStatus;
    } else {
      // Default: exclude archived/deleted
      statusMatch = lead.status !== 'archived' && lead.status !== 'deleted';
    }

    const interestMatch = !filterInterest || lead.interest === filterInterest;

    let nriMatch = true;
    if (filterNri === 'Yes') {
      const isNri = lead.is_nri || lead.isNri || '';
      nriMatch = isNri === 'Yes' || isNri.startsWith('Yes');
    } else if (filterNri === 'No') {
      const isNri = lead.is_nri || lead.isNri || '';
      nriMatch = isNri === 'No' || isNri.startsWith('No') || isNri === '';
    }

    return textMatch && statusMatch && interestMatch && nriMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include page 1
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    return pages;
  };

  // Pie Chart Data: Lead Distribution by Status
  const statusCounts = leads.reduce((acc, lead) => {
    const status = lead.status || 'new';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: 'New', value: statusCounts['new'] || 0, color: '#c9922a' },
    { name: 'Called', value: statusCounts['called'] || 0, color: '#3b82f6' },
    { name: 'Converted', value: statusCounts['converted'] || 0, color: '#10b981' },
    { name: 'Not Interested', value: statusCounts['not interested'] || 0, color: '#6b7280' },
  ].filter(item => item.value > 0);

  // Line Chart Data: Lead Intake Trends over last 30 days
  const getIntakeData = () => {
    const dates = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dates[dateStr] = 0;
    }

    leads.forEach(lead => {
      if (lead.created_at) {
        const dateStr = lead.created_at.includes('T') 
          ? lead.created_at.split('T')[0] 
          : lead.created_at.trim();
        if (dates[dateStr] !== undefined) {
          dates[dateStr] += 1;
        }
      }
    });

    return Object.keys(dates).map(dateStr => {
      const dateObj = new Date(dateStr);
      return {
        date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        'New Leads': dates[dateStr]
      };
    });
  };

  const lineData = getIntakeData();

  // Month-over-Month calculations
  const getMoMTrend = () => {
    const now = new Date();
    
    // This month leads
    const thisMonthLeads = leads.filter(l => {
      if (!l.created_at) return false;
      const d = new Date(l.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    
    // Last month leads
    const prevMonthDate = new Date();
    prevMonthDate.setMonth(now.getMonth() - 1);
    const lastMonthLeads = leads.filter(l => {
      if (!l.created_at) return false;
      const d = new Date(l.created_at);
      return d.getMonth() === prevMonthDate.getMonth() && d.getFullYear() === prevMonthDate.getFullYear();
    });

    const thisMonthCount = thisMonthLeads.length;
    const lastMonthCount = lastMonthLeads.length;

    let pct = 0;
    if (lastMonthCount === 0) {
      pct = thisMonthCount > 0 ? 100 : 0;
    } else {
      pct = Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100);
    }

    return {
      thisMonthCount,
      lastMonthCount,
      trendPct: pct
    };
  };

  const { thisMonthCount, trendPct } = getMoMTrend();


  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">
      <Helmet>
        <title>Admin Dashboard | Drishti Wealth</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Top Nav */}
      <nav className="bg-[#0d2545] h-[56px] flex items-center justify-between px-[2rem]">
        <div className="flex items-center gap-2.5">
          <img
            src="/DW_22-removebg-preview.png"
            alt="Drishti Wealth Logo"
            className="h-8 w-auto object-contain shrink-0"
          />
          <div className="text-white font-serif text-[16px] font-semibold">Drishti Wealth</div>
        </div>
        <div className="text-white/60 text-[14px]">Admin Dashboard</div>
        <button 
          onClick={handleLogout}
          className="bg-white/10 text-white border-none py-[8px] px-[16px] rounded-[6px] cursor-pointer hover:bg-white/20 transition-colors"
        >
          Logout
        </button>
      </nav>

      {/* Stat Cards */}
      <div className="flex flex-row gap-[16px] px-[2rem] py-[1.5rem] bg-[#faf8f4] border-b border-[#0d2545]/10 flex-wrap">
        {loading ? (
          <>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-gray-200 min-w-[180px] shadow-sm animate-pulse">
              <div className="h-[28px] bg-gray-200 rounded w-[45px] mb-2"></div>
              <div className="h-[12px] bg-gray-200/60 rounded w-[80px]"></div>
              <div className="h-[10px] bg-gray-200/40 rounded w-[60px] mt-2"></div>
            </div>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-gray-200 min-w-[180px] shadow-sm animate-pulse">
              <div className="h-[28px] bg-gray-200 rounded w-[45px] mb-2"></div>
              <div className="h-[12px] bg-gray-200/60 rounded w-[80px]"></div>
              <div className="h-[10px] bg-gray-200/40 rounded w-[60px] mt-2"></div>
            </div>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-gray-200 min-w-[180px] shadow-sm animate-pulse">
              <div className="h-[28px] bg-gray-200 rounded w-[45px] mb-2"></div>
              <div className="h-[12px] bg-gray-200/60 rounded w-[80px]"></div>
              <div className="h-[10px] bg-gray-200/40 rounded w-[60px] mt-2"></div>
            </div>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-gray-200 min-w-[180px] shadow-sm animate-pulse">
              <div className="h-[28px] bg-gray-200 rounded w-[45px] mb-2"></div>
              <div className="h-[12px] bg-gray-200/60 rounded w-[80px]"></div>
              <div className="h-[10px] bg-gray-200/40 rounded w-[60px] mt-2"></div>
            </div>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-gray-200 min-w-[180px] shadow-sm animate-pulse">
              <div className="h-[28px] bg-gray-200 rounded w-[45px] mb-2"></div>
              <div className="h-[12px] bg-gray-200/60 rounded w-[80px]"></div>
              <div className="h-[10px] bg-gray-200/40 rounded w-[60px] mt-2"></div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#c9922a] min-w-[180px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">{leads.length}</div>
                <div className="text-[12px] text-[#5c6478]">Total Leads</div>
              </div>
              <div className="text-[11px] text-[#5c6478]/60 mt-1.5 font-medium">Database lifetime</div>
            </div>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#3b82f6] min-w-[180px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">
                  {leads.filter(l => (l.status || 'new') === 'new').length}
                </div>
                <div className="text-[12px] text-[#5c6478]">New Leads</div>
              </div>
              <div className="text-[11px] text-[#3b82f6]/80 mt-1.5 font-medium">Pending action</div>
            </div>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#10b981] min-w-[180px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">
                  {leads.filter(l => {
                    const nri = (l.is_nri || l.isNri || '');
                    return nri === 'Yes' || nri.startsWith('Yes');
                  }).length}
                </div>
                <div className="text-[12px] text-[#5c6478]">NRI Leads</div>
              </div>
              <div className="text-[11px] text-[#10b981]/80 mt-1.5 font-medium">Global clients</div>
            </div>
            <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#8b5cf6] min-w-[180px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">
                  {thisMonthCount}
                </div>
                <div className="text-[12px] text-[#5c6478]">This Month</div>
              </div>
              <div className="text-[11px] mt-1.5 flex items-center gap-1">
                {trendPct > 0 ? (
                  <span className="text-[#10b981] font-semibold flex items-center gap-0.5">
                    ↑ +{trendPct}%
                  </span>
                ) : trendPct < 0 ? (
                  <span className="text-[#dc2626] font-semibold flex items-center gap-0.5">
                    ↓ {trendPct}%
                  </span>
                ) : (
                  <span className="text-[#6b7280] font-semibold flex items-center gap-0.5">
                    0%
                  </span>
                )}
                <span className="text-[#5c6478]/70">vs last month</span>
              </div>
            </div>
            
            {/* Interactive Charts Toggle Card */}
            <button
              onClick={() => setShowCharts(prev => !prev)}
              className={`rounded-[10px] py-[1rem] px-[1.25rem] min-w-[180px] shadow-sm flex flex-col justify-between items-start text-left cursor-pointer transition-all border ${
                showCharts 
                  ? 'bg-[#0d2545] text-white border-[#0d2545]' 
                  : 'bg-white text-[#1a1a2e] border-[#0d2545]/15 hover:border-[#c9922a] hover:shadow'
              }`}
            >
              <div className="w-full">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-serif text-[16px] font-semibold">
                    {showCharts ? 'Hide Charts' : 'Show Charts'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showCharts ? 'text-[#c9922a]' : 'text-[#5c6478]'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    {showCharts ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    )}
                  </svg>
                </div>
                <div className={`text-[12px] ${showCharts ? 'text-white/70' : 'text-[#5c6478]'}`}>Visual Analytics</div>
              </div>
              <div className={`text-[11px] mt-1.5 font-medium ${showCharts ? 'text-[#c9922a]' : 'text-[#5c6478]/80'}`}>
                {showCharts ? 'Click to collapse panels' : 'Click to expand panels'}
              </div>
            </button>
          </>
        )}
      </div>

      {/* Analytics Charts */}
      <AnimatePresence initial={false}>
        {showCharts && !loading && leads.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', opacity: 1, overflow: 'visible' }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] px-[2rem] py-[1.5rem] bg-[#faf8f4]/40 border-b border-[#0d2545]/10">
              
              {/* Line Chart Panel */}
              <div className="bg-white rounded-[14px] p-5 border border-[#0d2545]/10 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-[15px] font-semibold text-[#0d2545]">Lead Intake Trends (Last 30 Days)</h3>
                  <span className="text-[11px] font-medium text-[#5c6478] bg-[#0d2545]/5 px-2.5 py-1 rounded-[6px]">Daily Submissions</span>
                </div>
                <div className="h-[280px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 37, 69, 0.05)" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#5c6478', fontSize: 11 }} 
                        stroke="rgba(13, 37, 69, 0.1)"
                      />
                      <YAxis 
                        tick={{ fill: '#5c6478', fontSize: 11 }} 
                        stroke="rgba(13, 37, 69, 0.1)"
                        allowDecimals={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid rgba(13, 37, 69, 0.12)', 
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontFamily: 'sans-serif',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="New Leads" 
                        stroke="#c9922a" 
                        strokeWidth={2.5}
                        dot={{ fill: '#c9922a', strokeWidth: 1, r: 3 }}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart Panel */}
              <div className="bg-white rounded-[14px] p-5 border border-[#0d2545]/10 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-[15px] font-semibold text-[#0d2545]">Lead Distribution by Status</h3>
                  <span className="text-[11px] font-medium text-[#5c6478] bg-[#0d2545]/5 px-2.5 py-1 rounded-[6px]">Status Distribution</span>
                </div>
                <div className="h-[280px] w-full relative flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="w-[180px] h-[180px] flex-shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} leads`, name]}
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid rgba(13, 37, 69, 0.12)', 
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontFamily: 'sans-serif',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center text of donut chart */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[22px] font-bold font-serif text-[#0d2545]">{leads.length}</span>
                      <span className="text-[9px] text-[#5c6478] uppercase tracking-wider font-semibold">Active Leads</span>
                    </div>
                  </div>
                  
                  {/* Custom Legend to match the premium aesthetics */}
                  <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                    {pieData.map((entry, index) => {
                      const percentage = ((entry.value / leads.length) * 100).toFixed(0);
                      return (
                        <div key={index} className="flex items-center gap-3 text-[13px] text-[#5c6478]">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                          <span className="font-medium text-[#0d2545] min-w-[90px]">{entry.name}</span>
                          <span className="font-semibold text-[#1a1a2e]">{entry.value}</span>
                          <span className="text-[11px] text-[#5c6478]/70">({percentage}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search, Filters, & Actions Grid */}
      <div className="px-[2rem] py-[1rem] flex flex-col gap-[16px] border-b border-[#0d2545]/5 bg-[#faf8f4]/30">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[12px] flex-wrap">
          {/* Left Column: Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[8px] w-full lg:w-auto flex-wrap">
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-[14px] py-[9px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none w-full sm:w-[240px] focus:border-[#c9922a] transition-colors bg-white"
            />
            
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-[12px] py-[9px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none bg-white cursor-pointer focus:border-[#c9922a] w-full sm:w-auto min-w-[130px]"
            >
              <option value="">Active Leads</option>
              <option value="new">New</option>
              <option value="called">Called</option>
              <option value="converted">Converted</option>
              <option value="not interested">Not Interested</option>
              <option value="archived">📁 Trash / Archived</option>
            </select>

            {/* Service Interest Filter */}
            <select
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="px-[12px] py-[9px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none bg-white cursor-pointer focus:border-[#c9922a] w-full sm:w-auto min-w-[160px]"
            >
              <option value="">All Interests</option>
              <option value="Mutual Fund SIP">Mutual Fund SIP</option>
              <option value="Insurance Planning">Insurance Planning</option>
              <option value="NRI Investment Services">NRI Investment Services</option>
              <option value="Portfolio Review">Portfolio Review</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>

            {/* NRI Status Filter */}
            <select
              value={filterNri}
              onChange={(e) => setFilterNri(e.target.value)}
              className="px-[12px] py-[9px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none bg-white cursor-pointer focus:border-[#c9922a] w-full sm:w-auto min-w-[110px]"
            >
              <option value="">All NRI Status</option>
              <option value="Yes">NRI (Yes)</option>
              <option value="No">Non-NRI (No)</option>
            </select>

            {/* Reset Filters button */}
            {(searchTerm || filterStatus || filterInterest || filterNri) && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('');
                  setFilterInterest('');
                  setFilterNri('');
                }}
                className="text-gray-500 hover:text-[#c9922a] text-[12px] font-medium bg-transparent border-none cursor-pointer py-1 px-2 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Right Column: Actions */}
          <div className="flex gap-[8px] w-full lg:w-auto flex-wrap">
            {selectedLeads.size > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={bulkDeleting}
                className="flex-1 lg:flex-initial bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-[18px] py-[9px] rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {bulkDeleting ? 'Archiving...' : `Archive Selected (${selectedLeads.size})`}
              </button>
            )}
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 lg:flex-initial bg-[#c9922a] hover:bg-[#b07f21] text-white px-[18px] py-[9px] rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors whitespace-nowrap"
            >
              + Create Lead
            </button>
            <button 
              onClick={handleExportCSV}
              className="flex-1 lg:flex-initial bg-[#0d2545] text-white px-[18px] py-[9px] rounded-[8px] text-[13px] cursor-pointer hover:bg-[#1a365d] transition-colors whitespace-nowrap"
            >
              CSV Export
            </button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="px-[2rem] pb-10">
        {loading ? (
          <div className="w-full animate-pulse space-y-4 min-w-[800px] overflow-x-auto">
            {/* Table Header Skeleton */}
            <div className="h-[40px] bg-gray-150 bg-gray-200/80 rounded-[6px] w-full flex items-center px-[14px] gap-4">
              <div className="h-[12px] bg-gray-300 rounded w-[15%]"></div>
              <div className="h-[12px] bg-gray-300 rounded w-[15%]"></div>
              <div className="h-[12px] bg-gray-300 rounded w-[12%]"></div>
              <div className="h-[12px] bg-gray-300 rounded w-[18%]"></div>
              <div className="h-[12px] bg-gray-300 rounded w-[10%]"></div>
              <div className="h-[12px] bg-gray-300 rounded w-[12%]"></div>
              <div className="h-[12px] bg-gray-300 rounded w-[10%]"></div>
              <div className="h-[12px] bg-gray-300 rounded w-[8%]"></div>
            </div>
            {/* Table Rows Skeletons */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="h-[48px] bg-white border border-[#0d2545]/5 rounded-[6px] w-full flex items-center px-[14px] gap-4">
                <div className="h-[12px] bg-gray-200/80 rounded w-[15%]"></div>
                <div className="h-[12px] bg-gray-200/80 rounded w-[15%]"></div>
                <div className="h-[12px] bg-gray-200/80 rounded w-[12%]"></div>
                <div className="h-[12px] bg-gray-200/80 rounded w-[18%]"></div>
                <div className="h-[12px] bg-gray-200/80 rounded w-[10%]"></div>
                <div className="h-[12px] bg-gray-200/80 rounded w-[12%]"></div>
                <div className="h-[12px] bg-gray-200/80 rounded w-[10%] pl-2"></div>
                <div className="h-[12px] bg-gray-200/80 rounded w-[8%]"></div>
              </div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-10 text-[#5c6478]">
            No leads yet. Leads submitted through the website will appear here.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead className="bg-[#0d2545]/5 sticky top-0">
                  <tr>
                    <th className="px-[14px] py-[10px] border-b border-[#0d2545]/10 w-[40px]">
                      <input
                        type="checkbox"
                        className="w-[14px] h-[14px] cursor-pointer accent-[#c9922a]"
                        checked={currentItems.length > 0 && currentItems.every(l => selectedLeads.has(l.id))}
                        ref={el => {
                          if (el) el.indeterminate = currentItems.some(l => selectedLeads.has(l.id)) && !currentItems.every(l => selectedLeads.has(l.id));
                        }}
                        onChange={() => {
                          const allSelected = currentItems.every(l => selectedLeads.has(l.id));
                          const newSet = new Set(selectedLeads);
                          currentItems.forEach(l => allSelected ? newSet.delete(l.id) : newSet.add(l.id));
                          setSelectedLeads(newSet);
                        }}
                        title="Select all on this page"
                      />
                    </th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Name</th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Phone</th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">City</th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Interest</th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">NRI</th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Date</th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Status</th>
                    <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((lead, index) => {
                    const currentStatus = lead.status || 'new';
                    const rowStyles = `border-b border-[#0d2545]/[0.06] ${index % 2 === 0 ? 'bg-white' : 'bg-[#0d2545]/[0.02]'}`;
                    
                    const isChecked = selectedLeads.has(lead.id);
                    return (
                      <motion.tr 
                        key={lead.id || index} 
                        layout
                        initial={lead.isNewHighlight ? { backgroundColor: 'rgba(201, 146, 42, 0.25)' } : undefined}
                        animate={{ 
                          backgroundColor: isChecked ? 'rgba(201, 146, 42, 0.07)' : index % 2 === 0 ? '#ffffff' : 'rgba(13, 37, 69, 0.02)'
                        }}
                        transition={{ duration: 0.2 }}
                        className={rowStyles}
                      >
                        <td className="px-[14px] py-[10px] w-[40px]">
                          <input
                            type="checkbox"
                            className="w-[14px] h-[14px] cursor-pointer accent-[#c9922a]"
                            checked={isChecked}
                            onChange={() => {
                              const newSet = new Set(selectedLeads);
                              isChecked ? newSet.delete(lead.id) : newSet.add(lead.id);
                              setSelectedLeads(newSet);
                            }}
                          />
                        </td>
                        <td className={`px-[14px] py-[10px] text-[13px] text-[#1a1a2e] ${currentStatus === 'new' ? 'border-l-[3px] border-[#c9922a]' : 'border-l-[3px] border-transparent'}`}>
                          {lead.name || '-'}
                        </td>
                        <td className="px-[14px] py-[10px] text-[13px] text-[#1a1a2e]">{lead.phone || '-'}</td>
                        <td className="px-[14px] py-[10px] text-[13px] text-[#1a1a2e]">{lead.city || '-'}</td>
                        <td className="px-[14px] py-[10px] text-[13px] text-[#1a1a2e]">{lead.interest || '-'}</td>
                        <td className="px-[14px] py-[10px] text-[13px] text-[#1a1a2e]">
                          {lead.is_nri || lead.isNri || '-'}
                        </td>
                        <td className="px-[14px] py-[10px] text-[13px] text-[#1a1a2e]">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-[14px] py-[10px]">
                          <select 
                            value={currentStatus}
                            onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                            className="border-none text-[12px] font-medium cursor-pointer px-[8px] py-[4px] rounded-[4px] outline-none"
                            style={getStatusStyles(currentStatus)}
                          >
                            <option value="new">new</option>
                            <option value="called">called</option>
                            <option value="converted">converted</option>
                            <option value="not interested">not interested</option>
                            <option value="archived">archived</option>
                          </select>
                        </td>
                        <td className="px-[14px] py-[10px] flex items-center gap-2">
                          <button 
                            onClick={() => handleViewDetails(lead)}
                            className="bg-transparent border-none text-[#c9922a] hover:text-[#b07f21] text-[12px] font-medium cursor-pointer transition-colors"
                          >
                            View Details
                          </button>
                          {(lead.status === 'archived' || lead.status === 'deleted') && (
                            <button
                              onClick={() => handleRestoreLead(lead.id, 'new')}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[11px] font-medium px-2 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-1"
                              title="Restore Lead"
                            >
                              ↺ Restore
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-[#0d2545]/10">
              {/* Left Side: Items per page selector */}
              <div className="flex items-center gap-2 text-[13px] text-[#5c6478]">
                <span>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-[#0d2545]/15 rounded-[6px] outline-none bg-white cursor-pointer focus:border-[#c9922a] text-[13px]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>leads per page</span>
              </div>

              {/* Middle: Range info text */}
              <div className="text-[13px] text-[#5c6478]">
                Showing <span className="font-medium text-[#0d2545]">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium text-[#0d2545]">{Math.min(indexOfLastItem, filteredLeads.length)}</span> of{' '}
                <span className="font-medium text-[#0d2545]">{filteredLeads.length}</span> leads
              </div>

              {/* Right Side: Page buttons */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center p-2 rounded-[6px] border border-[#0d2545]/10 hover:bg-[#0d2545]/5 text-[#0d2545] disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                    title="Previous Page"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Render page numbers */}
                  {getPageNumbers().map((pageNum, idx) => {
                    if (pageNum === '...') {
                      return (
                        <span key={`ellipsis-${idx}`} className="px-2 text-[#5c6478] text-[13px]">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-[6px] text-[13px] font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#c9922a] text-white border border-[#c9922a] shadow-sm'
                            : 'bg-transparent text-[#0d2545] hover:bg-[#0d2545]/5 border border-transparent'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center p-2 rounded-[6px] border border-[#0d2545]/10 hover:bg-[#0d2545]/5 text-[#0d2545] disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                    title="Next Page"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>


      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[500px] bg-white shadow-2xl z-[101] flex flex-col font-sans text-[#1a1a2e]"
            >
              {/* Header */}
              <div className="bg-[#0d2545] text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-[18px] font-semibold">{selectedLead.name || 'Lead Details'}</h3>
                  <p className="text-white/60 text-[12px] mt-0.5">Submitted on {selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-white/70 hover:text-white bg-transparent border-none text-[22px] cursor-pointer p-1 leading-none"
                >
                  &times;
                </button>
              </div>

              {/* Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Lead Contact Info Block */}
                <div className="bg-[#faf8f4] border border-[#0d2545]/10 rounded-[10px] p-4">
                  <h4 className="text-[11px] font-semibold text-[#0d2545] uppercase tracking-wider mb-3">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[13px]">
                    <div>
                      <span className="text-[#5c6478] block text-[11px]">Phone</span>
                      <a href={`tel:${(selectedLead.phone || '').replace(/[^0-9+\s\-().]/g, '')}`} className="font-medium text-[#c9922a] hover:underline">
                        {selectedLead.phone || '-'}
                      </a>
                    </div>
                    <div>
                      <span className="text-[#5c6478] block text-[11px]">City</span>
                      <span className="font-medium">{selectedLead.city || '-'}</span>
                    </div>
                    <div>
                      <span className="text-[#5c6478] block text-[11px]">Service Interest</span>
                      <span className="font-medium">{selectedLead.interest || '-'}</span>
                    </div>
                    <div>
                      <span className="text-[#5c6478] block text-[11px]">NRI Status</span>
                      <span className="font-medium">{selectedLead.is_nri || selectedLead.isNri || '-'}</span>
                    </div>
                    {(selectedLead.nri_country || selectedLead.nriCountry) && (
                      <div className="col-span-2">
                        <span className="text-[#5c6478] block text-[11px]">Country</span>
                        <span className="font-medium">{selectedLead.nri_country || selectedLead.nriCountry || '-'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Block */}
                <div>
                  <h4 className="text-[11px] font-semibold text-[#0d2545] uppercase tracking-wider mb-2">Message</h4>
                  {selectedLead.message ? (
                    <blockquote className="bg-[#faf8f4] border-l-[3px] border-[#c9922a] p-4 rounded-r-[6px] text-[13px] text-[#5c6478] italic leading-relaxed">
                      "{selectedLead.message}"
                    </blockquote>
                  ) : (
                    <span className="text-[13px] text-[#5c6478] italic">No message submitted.</span>
                  )}
                </div>

                {/* Notes / Timeline Section */}
                <div>
                  <h4 className="text-[11px] font-semibold text-[#0d2545] uppercase tracking-wider mb-4">Follow-up Notes</h4>
                  
                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="mb-6">
                    <textarea
                      rows="3"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add a progress or follow-up note (e.g. called client, scheduled callback)..."
                      className="w-full text-[13px] p-3 border border-[#0d2545]/15 rounded-[8px] focus:border-[#c9922a] outline-none resize-none bg-white transition-colors"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={submittingNote || !newNoteText.trim()}
                        className="bg-[#0d2545] text-white text-[12px] font-medium py-1.5 px-4 rounded-[6px] cursor-pointer hover:bg-[#1a365d] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {submittingNote ? 'Saving...' : 'Add Note'}
                      </button>
                    </div>
                  </form>

                  {/* Notes List / Timeline */}
                  {loadingNotes ? (
                    <div className="text-center py-4 text-[13px] text-[#5c6478]">Loading notes...</div>
                  ) : notes.length === 0 ? (
                    <div className="text-center py-4 text-[13px] text-[#5c6478] bg-[#faf8f4] border border-[#0d2545]/5 rounded-[8px] italic">
                      No notes recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-4 relative before:absolute before:left-[11px] before:top-[12px] before:bottom-[12px] before:w-[2px] before:bg-[#0d2545]/10">
                      {notes.map((note) => (
                        <div key={note.id} className="flex gap-4 relative group">
                          {/* Circle Dot */}
                          <div className="w-[24px] h-[24px] rounded-full bg-[#faf8f4] border-2 border-[#c9922a] flex items-center justify-center flex-shrink-0 z-10">
                            <div className="w-[8px] h-[8px] rounded-full bg-[#c9922a]" />
                          </div>
                          {/* Note Card */}
                          <div className="bg-[#faf8f4] border border-[#0d2545]/5 rounded-[8px] p-3 flex-1 text-[13px] relative">
                            <div className="flex justify-between items-start gap-2">
                              <p className="text-[#1a1a2e] whitespace-pre-wrap leading-relaxed flex-1">{note.text}</p>
                              <button
                                type="button"
                                onClick={() => handleDeleteNote(note.id)}
                                title="Delete Note"
                                className="text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded px-1.5 py-0.5 text-[16px] leading-none transition-colors cursor-pointer"
                              >
                                &times;
                              </button>
                            </div>
                            <span className="text-[10px] text-[#5c6478] block mt-1.5 font-medium">
                              {new Date(note.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-[#faf8f4] border-t border-[#0d2545]/10 px-6 py-4 flex justify-between items-center rounded-b-[14px]">
                {(selectedLead.status === 'archived' || selectedLead.status === 'deleted') ? (
                  <button
                    type="button"
                    onClick={() => handleRestoreLead(selectedLead.id, 'new')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium py-[8px] px-[16px] rounded-[8px] cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    ↺ Restore Lead
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={deletingLead}
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="bg-transparent border border-[#dc2626]/20 hover:bg-[#dc2626]/5 text-[#dc2626] text-[13px] font-medium py-[8px] px-[16px] rounded-[8px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deletingLead ? 'Archiving...' : 'Archive / Delete Lead'}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="fixed inset-0 m-auto w-[90%] max-w-[500px] h-fit max-h-[90vh] bg-white rounded-[14px] border border-[#0d2545]/12 shadow-2xl z-[101] flex flex-col font-sans text-[#1a1a2e]"
            >
              {/* Header */}
              <div className="bg-[#0d2545] text-white px-6 py-4 flex items-center justify-between rounded-t-[14px]">
                <h3 className="font-serif text-[17px] font-semibold">Create New Lead</h3>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-white/70 hover:text-white bg-transparent border-none text-[22px] cursor-pointer p-1 leading-none"
                >
                  &times;
                </button>
              </div>

              {/* Form (Scrollable body) */}
              <form onSubmit={handleCreateLead} className="flex-1 overflow-y-auto p-6 space-y-4">
                {createError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-[#dc2626] py-[8px] px-[12px] rounded-[6px] text-[13px] text-center">
                    {createError}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] text-[#5c6478] uppercase tracking-[0.04em] font-medium mb-[4px]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={createFormData.name}
                    onChange={(e) => setCreateFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-[12px] py-[8px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none focus:border-[#c9922a] bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#5c6478] uppercase tracking-[0.04em] font-medium mb-[4px]">Phone / WhatsApp *</label>
                  <PhoneNumberField variant="light" value={createFormData.phone} onChange={(phone) => setCreateFormData(prev => ({ ...prev, phone }))} />
                </div>

                <div>
                  <label className="block text-[11px] text-[#5c6478] uppercase tracking-[0.04em] font-medium mb-[4px]">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={createFormData.city}
                    onChange={(e) => setCreateFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-[12px] py-[8px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none focus:border-[#c9922a] bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#5c6478] uppercase tracking-[0.04em] font-medium mb-[4px]">Service Interest *</label>
                  <select
                    required
                    value={createFormData.interest}
                    onChange={(e) => setCreateFormData(prev => ({ ...prev, interest: e.target.value }))}
                    className="w-full px-[12px] py-[8px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none focus:border-[#c9922a] bg-white transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Select interest area</option>
                    <option value="Mutual Fund SIP">Mutual Fund SIP</option>
                    <option value="Insurance Planning">Insurance Planning</option>
                    <option value="NRI Investment Services">NRI Investment Services</option>
                    <option value="Tax Saving ELSS">Tax Saving ELSS</option>
                    <option value="Portfolio Review">Portfolio Review</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#5c6478] uppercase tracking-[0.04em] font-medium mb-[4px]">NRI Status</label>
                  <select
                    value={createFormData.isNri}
                    onChange={(e) => setCreateFormData(prev => ({ ...prev, isNri: e.target.value }))}
                    className="w-full px-[12px] py-[8px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none focus:border-[#c9922a] bg-white transition-colors cursor-pointer appearance-none"
                  >
                    <option value="No: I am based in India">No: I am based in India</option>
                    <option value="Yes: USA or Canada">Yes: USA or Canada</option>
                    <option value="Yes: UAE or Middle East">Yes: UAE or Middle East</option>
                    <option value="Yes: UK or Europe">Yes: UK or Europe</option>
                    <option value="Yes: Australia or New Zealand">Yes: Australia or New Zealand</option>
                    <option value="Yes: Singapore or SE Asia">Yes: Singapore or SE Asia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#5c6478] uppercase tracking-[0.04em] font-medium mb-[4px]">Notes / Message</label>
                  <textarea
                    rows="3"
                    placeholder="Enter additional details, questions, or message..."
                    value={createFormData.message}
                    onChange={(e) => setCreateFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-[12px] py-[8px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none focus:border-[#c9922a] bg-white transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-[8px] justify-end pt-3 border-t border-[#0d2545]/10">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="bg-transparent border border-[#0d2545]/20 hover:bg-[#0d2545]/5 text-[#5c6478] text-[13px] font-medium py-[8px] px-[16px] rounded-[8px] cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingLead}
                    className="bg-[#0d2545] text-white text-[13px] font-medium py-[8px] px-[16px] rounded-[8px] cursor-pointer hover:bg-[#1a365d] transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {creatingLead ? 'Creating...' : 'Create Lead'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`pointer-events-auto px-4 py-3 rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] border text-[13px] font-medium flex items-center justify-between gap-3 min-w-[280px] ${
                toast.type === 'success'
                  ? 'bg-emerald-50 border-emerald-500/20 text-emerald-800'
                  : toast.type === 'error'
                  ? 'bg-rose-50 border-rose-500/20 text-rose-800'
                  : 'bg-[#faf8f4] border-[#0d2545]/10 text-[#0d2545]'
              }`}
            >
              <div className="flex items-center gap-2">
                {toast.type === 'success' && (
                  <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {toast.type === 'error' && (
                  <svg className="w-4 h-4 text-rose-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {toast.type === 'info' && (
                  <svg className="w-4 h-4 text-[#c9922a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span>{toast.message}</span>
              </div>
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action.onClick();
                    setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                  }}
                  className="bg-[#0d2545] hover:bg-[#1a365d] text-white text-[11px] font-semibold px-2.5 py-1 rounded cursor-pointer transition-colors shadow-sm whitespace-nowrap ml-2"
                >
                  {toast.action.label}
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
