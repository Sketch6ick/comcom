import React, { useState, useEffect } from 'react';
import { auth, db, productsCollection, getDocs, addDoc, deleteDoc, doc, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from './firebase';
import './App.css'; // นำเข้าไฟล์ CSS ที่ตกแต่ง

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('CPU');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        const querySnapshot = await getDocs(productsCollection);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      };
      fetchProducts();
    }
  }, [user]);

  const addProduct = async () => {
    if (!user) {
      alert("กรุณาล็อกอินก่อนเพิ่มสินค้า");
      return;
    }

    const newProduct = { name, brand, price, description, category };
    try {
      await addDoc(productsCollection, newProduct);
      setName('');
      setBrand('');
      setPrice('');
      setDescription('');
      setCategory('CPU');
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="App">
      <h1>ร้านขายคอมพิวเตอร์ - คริสต์มาส</h1>

      {/* รูปต้นคริสต์มาส */}
      <img src="https://www.example.com/christmas-tree.png" alt="ต้นคริสต์มาส" className="christmas-tree" />

      {/* ดาวตก */}
      <div className="falling-stars"></div>
      <div className="falling-stars"></div>
      <div className="falling-stars"></div>

      {!user ? (
        <div>
          <h2>เข้าสู่ระบบ</h2>
          <input
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>เข้าสู่ระบบ</button>
          <p>หรือ</p>
          <button onClick={register}>ลงทะเบียน</button>
        </div>
      ) : (
        <div>
          <h2>สวัสดี {user.email}</h2>
          <button onClick={logout}>ออกจากระบบ</button>
        </div>
      )}

      {user && (
        <div>
          <h2>เพิ่มสินค้า</h2>
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="ยี่ห้อ"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="number"
            placeholder="ราคา"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="รายละเอียด"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="CPU">CPU</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Mouse">Mouse</option>
            <option value="Headphone">Headphone</option>
          </select>
          <button onClick={addProduct}>เพิ่มสินค้า</button>
        </div>
      )}

      {user && (
        <div>
          <h2>สินค้าทั้งหมด</h2>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <h3>{product.name} ({product.category})</h3>
                <p>{product.description}</p>
                <p>ราคา: ฿{product.price}</p>
                <button className="delete" onClick={() => deleteProduct(product.id)}>ลบสินค้า</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
