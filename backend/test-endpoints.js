// Quick endpoint verification script
// Run with: node test-endpoints.js

const API_URL = 'http://localhost:5000/api';

async function testEndpoints() {
  console.log('🧪 Testing Roomie App API Endpoints...\n');

  // Test 1: Health Check
  try {
    const response = await fetch('http://localhost:5000');
    const data = await response.json();
    console.log('✅ Health Check:', data.message);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
    console.log('⚠️  Make sure backend is running on port 5000');
    return;
  }

  // Test 2: Get Properties
  try {
    const response = await fetch(`${API_URL}/properties`);
    const data = await response.json();
    console.log(`✅ Properties Endpoint: ${data.length} properties found`);
  } catch (error) {
    console.log('❌ Properties Endpoint Failed:', error.message);
  }

  // Test 3: Get Users
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    console.log(`✅ Users Endpoint: ${data.length} users found`);
  } catch (error) {
    console.log('❌ Users Endpoint Failed:', error.message);
  }

  // Test 4: Register (will fail if user exists, that's ok)
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const data = await response.json();
    if (response.ok) {
      console.log('✅ Register Endpoint: User created successfully');
    } else {
      console.log('⚠️  Register Endpoint:', data.message);
    }
  } catch (error) {
    console.log('❌ Register Endpoint Failed:', error.message);
  }

  console.log('\n📊 Endpoint Testing Complete!');
  console.log('\n💡 Tips:');
  console.log('   - If properties/users are 0, run: npm run seed');
  console.log('   - Check backend/.env for correct MONGODB_URI');
  console.log('   - Make sure MongoDB is running');
}

testEndpoints();
