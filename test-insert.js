import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://klempbsbqovcoywbdygd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZW1wYnNicW92Y295d2JkeWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MDc0NjMsImV4cCI6MjA5NTI4MzQ2M30.fcF8s9EEHXj8owAS3JGNr9isaRw3koFvc39BKschtxg'
)

async function testInsert() {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      name: 'Test Name',
      phone: '1234567890',
      city: 'Test City',
      interest: 'Test',
      is_nri: 'No',
      nri_country: '',
      message: 'Test message',
      status: 'new',
      created_at: new Date().toISOString()
    }]);

  if (error) {
    console.error('ERROR:', error.message, error.details, error.hint);
    process.exit(1);
  } else {
    console.log('SUCCESS! Insert worked.');
    process.exit(0);
  }
}

testInsert();
