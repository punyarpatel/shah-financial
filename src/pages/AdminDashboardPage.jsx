import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin');
      return;
    }

    const fetchLeads = async () => {
      try {
        const response = await api.get('/api/leads');
        setLeads(response.data || []);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Phone", "City", "Interest", "NRI", "Country", "Date", "Status"];
    
    const rows = leads.map(lead => {
      const isNriVal = lead.is_nri || lead.isNri || '';
      return [
        `"${lead.name || ''}"`,
        `"${lead.phone || ''}"`,
        `"${lead.city || ''}"`,
        `"${lead.interest || ''}"`,
        `"${isNriVal.startsWith('Yes') ? 'Yes' : 'No'}"`,
        `"${isNriVal.replace('Yes - ', '') || ''}"`,
        `"${lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ''}"`,
        `"${lead.status || 'new'}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      // Optimistic UI update
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      await api.patch(`/api/leads/${id}`, { status: newStatus });
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'new': return { color: '#c9922a', backgroundColor: 'rgba(201, 146, 42, 0.1)' };
      case 'called': return { color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' };
      case 'converted': return { color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' };
      case 'not interested': return { color: '#6b7280', backgroundColor: 'rgba(107, 114, 128, 0.1)' };
      default: return { color: '#c9922a', backgroundColor: 'rgba(201, 146, 42, 0.1)' }; // default to new
    }
  };

  const filteredLeads = leads.filter(lead => {
    const search = searchTerm.toLowerCase();
    const nameMatch = (lead.name || '').toLowerCase().includes(search);
    const phoneMatch = (lead.phone || '').toLowerCase().includes(search);
    return nameMatch || phoneMatch;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">
      
      {/* Top Nav */}
      <nav className="bg-[#0d2545] h-[56px] flex items-center justify-between px-[2rem]">
        <div className="text-white font-serif text-[16px]">Shah Financial Services</div>
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
        <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#c9922a] min-w-[180px] shadow-sm">
          <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">{leads.length}</div>
          <div className="text-[12px] text-[#5c6478]">Total Leads</div>
        </div>
        <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#3b82f6] min-w-[180px] shadow-sm">
          <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">
            {leads.filter(l => (l.status || 'new') === 'new').length}
          </div>
          <div className="text-[12px] text-[#5c6478]">New Leads</div>
        </div>
        <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#10b981] min-w-[180px] shadow-sm">
          <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">
            {leads.filter(l => {
              const nri = (l.is_nri || l.isNri || '');
              return nri === 'Yes' || nri.startsWith('Yes');
            }).length}
          </div>
          <div className="text-[12px] text-[#5c6478]">NRI Leads</div>
        </div>
        <div className="bg-white rounded-[10px] py-[1rem] px-[1.25rem] border-l-[3px] border-l-[#8b5cf6] min-w-[180px] shadow-sm">
          <div className="font-serif text-[28px] font-semibold text-[#0d2545] leading-none mb-1">
            {leads.filter(l => l.created_at && new Date(l.created_at).getMonth() === new Date().getMonth()).length}
          </div>
          <div className="text-[12px] text-[#5c6478]">This Month</div>
        </div>
      </div>

      {/* Search & Export Row */}
      <div className="px-[2rem] py-[1rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[12px]">
        <input 
          type="text" 
          placeholder="Search by name or phone..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-[14px] py-[9px] border border-[#0d2545]/15 rounded-[8px] text-[13px] outline-none w-full sm:w-[280px] focus:border-[#c9922a] transition-colors bg-white"
        />
        <button 
          onClick={handleExportCSV}
          className="bg-[#0d2545] text-white px-[18px] py-[9px] rounded-[8px] text-[13px] cursor-pointer hover:bg-[#1a365d] transition-colors"
        >
          CSV Export
        </button>
      </div>

      {/* Table Area */}
      <div className="px-[2rem] overflow-x-auto pb-10">
        {loading ? (
          <div className="text-center py-10 text-[#5c6478]">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-10 text-[#5c6478]">
            No leads yet. Leads submitted through the website will appear here.
          </div>
        ) : (
          <table className="w-full border-collapse min-w-[800px]">
            <thead className="bg-[#0d2545]/5 sticky top-0">
              <tr>
                <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Name</th>
                <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Phone</th>
                <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">City</th>
                <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Interest</th>
                <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">NRI</th>
                <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Date</th>
                <th className="px-[14px] py-[10px] text-[12px] uppercase tracking-[0.05em] text-[#5c6478] border-b border-[#0d2545]/10 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => {
                const currentStatus = lead.status || 'new';
                const rowStyles = `border-b border-[#0d2545]/[0.06] ${index % 2 === 0 ? 'bg-white' : 'bg-[#0d2545]/[0.02]'}`;
                
                return (
                  <tr key={lead.id || index} className={rowStyles}>
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
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AdminDashboardPage;
