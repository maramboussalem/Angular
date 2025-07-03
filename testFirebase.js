// testFirebase.js
const { db } = require('./firebase');

async function testFirebase() {
  try {
    const testDocRef = db.collection('test').doc('demo');
    await testDocRef.set({ message: 'Connexion Firebase OK ✅' });

    const doc = await testDocRef.get();
    console.log('✅ Donnée lue depuis Firestore :', doc.data());
  } catch (error) {
    console.error('❌ Erreur de connexion Firebase :', error);
  }
}

testFirebase();
