// controllers/userController.js
const { auth, db } = require('../firebase');

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password, displayName: name });
    await db.collection('users').doc(userRecord.uid).set({ name, email, role, picture: '' });
    res.status(201).json({ message: "User registered", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  res.status(501).json({ message: "Login should be done on the client with Firebase Auth SDK" });
  // Tu peux valider les tokens côté backend si besoin
};

exports.updateProfile = async (req, res) => {
  const { uid, name, role } = req.body;
  try {
    await db.collection('users').doc(uid).update({ name, role });
    res.json({ message: "Profile updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePicture = async (req, res) => {
  const { uid, pictureUrl } = req.body;
  try {
    await db.collection('users').doc(uid).update({ picture: pictureUrl });
    res.json({ message: "Picture updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.showAccount = async (req, res) => {
  const { uid } = req.query;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ message: "User not found" });
    res.json(userDoc.data());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  const { uid } = req.body;
  try {
    await auth.deleteUser(uid);
    await db.collection('users').doc(uid).delete();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
