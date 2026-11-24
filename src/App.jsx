import { useMemo, useState } from "react";
import {
  Search, ShoppingBasket, MapPin, SlidersHorizontal, Plus, Minus,
  Leaf, Clock3, Store, X, ChevronDown
} from "lucide-react";

const stores = ["All stores", "FreshMart", "Daily Basket", "Green Grocery"];
const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Snacks", "Beverages"];

const products = [
  { id: 1, name: "Red Apples", category: "Fruits", unit: "1 kg", price: 145, old: 165, store: "FreshMart", emoji: "🍎", color: "peach", tag: "Popular" },
  { id: 2, name: "Fresh Bananas", category: "Fruits", unit: "1 dozen", price: 55, old: null, store: "Daily Basket", emoji: "🍌", color: "yellow", tag: "Fresh pick" },
  { id: 3, name: "Farm Tomatoes", category: "Vegetables", unit: "1 kg", price: 38, old: 45, store: "Green Grocery", emoji: "🍅", color: "pink", tag: "10% off" },
  { id: 4, name: "Green Broccoli", category: "Vegetables", unit: "500 g", price: 68, old: null, store: "FreshMart", emoji: "🥦", color: "green", tag: "Organic" },
  { id: 5, name: "Whole Milk", category: "Dairy", unit: "1 litre", price: 62, old: null, store: "Daily Basket", emoji: "🥛", color: "blue", tag: "Daily essential" },
  { id: 6, name: "Cheddar Cheese", category: "Dairy", unit: "200 g", price: 125, old: 145, store: "FreshMart", emoji: "🧀", color: "yellow", tag: "Deal" },
  { id: 7, name: "Whole Wheat Bread", category: "Bakery", unit: "400 g", price: 48, old: null, store: "Green Grocery", emoji: "🍞", color: "peach", tag: "Baked today" },
  { id: 8, name: "Butter Croissant", category: "Bakery", unit: "2 pieces", price: 75, old: null, store: "Daily Basket", emoji: "🥐", color: "yellow", tag: "Fresh pick" },
  { id: 9, name: "Potato Chips", category: "Snacks", unit: " pack", price: 30, old: null, store: "FreshMart", emoji: "🥔", color: "peach", tag: "Popular" },
  { id: 10, name: "Mixed Nuts", category: "Snacks", unit: "200 g", price: 180, old: 210, store: "Green Grocery", emoji: "🥜", color: "green", tag: "15% off" },
  { id: 11, name: "Orange Juice", category: "Beverages", unit: "1 litre", price: 95, old: null, store: "Daily Basket", emoji: "🧃", color: "yellow", tag: "No added sugar" },
  { id: 12, name: "Green Tea", category: "Beverages", unit: "25 bags", price: 110, old: 125, store: "FreshMart", emoji: "🍵", color: "green", tag: "Bestseller" }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [store, setStore] = useState("All stores");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const visibleProducts = useMemo(() => {
    let result = products.filter(p =>
      (category === "All" || p.category === category) &&
      (store === "All stores" || p.store === store) &&
      `${p.name} ${p.category} ${p.store}`.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [search, category, store, sort]);

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);

  function updateCart(id, change) {
    setCart(current => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + change) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark"><ShoppingBasket size={21}/></span> freshcart<span className="brand-dot">.</span></a>
        <div className="delivery"><MapPin size={16}/><span><small>DELIVERING TO</small><strong>Your location</strong></span><ChevronDown size={15}/></div>
        <button className="cart-button" onClick={() => setShowCart(true)}><ShoppingBasket size={18}/> <span>My basket</span><b>{count}</b></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Leaf size={14}/> YOUR EVERYDAY GROCERY FINDER</span>
            <h1>Good food.<br/><em>Good mood.</em></h1>
            <p>Explore everyday essentials from online grocery stores, compare prices, and build your basket in one place.</p>
            <div className="hero-points"><span><Clock3 size={15}/> Convenient shopping</span><span><Store size={15}/> Multiple stores</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a grocery basket">
            <div className="sun"></div><div className="art-basket">🧺</div>
            <span className="float fruit-one">🍊</span><span className="float fruit-two">🥑</span><span className="float fruit-three">🍓</span>
            <div className="art-note">A little fresher<br/>every day <span>✳</span></div>
          </div>
        </section>

        <section className="catalog">
          <div className="section-heading">
            <div><span className="eyebrow muted">SHOP SMARTER</span><h2>Find your groceries</h2><p>Browse products and see which store they’re listed in.</p></div>
            <div className="result-count"><strong>{visibleProducts.length}</strong> products found</div>
          </div>

          <div className="toolbar">
            <label className="search-box"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groceries, brands or stores..." /><kbd>⌕</kbd></label>
            <label className="store-select"><Store size={17}/><select value={store} onChange={e => setStore(e.target.value)}>{stores.map(s => <option key={s}>{s}</option>)}</select><ChevronDown size={15}/></label>
            <label className="sort-select"><SlidersHorizontal size={17}/><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select><ChevronDown size={15}/></label>
          </div>

          <div className="categories">
            {categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? "category active" : "category"}>{c}</button>)}
          </div>

          <div className="product-grid">
            {visibleProducts.map(p => (
              <article className="product-card" key={p.id}>
                <div className={`product-image ${p.color}`}><span className="product-tag">{p.tag}</span><span className="product-emoji">{p.emoji}</span></div>
                <div className="product-info">
                  <span className="product-category">{p.category}</span><h3>{p.name}</h3><p className="unit">{p.unit}</p>
                  <div className="store-line"><Store size={13}/>{p.store}</div>
                  <div className="card-bottom"><div className="price">₹{p.price}<small>{p.old && <del>₹{p.old}</del>}</small></div>
                    {(cart[p.id] || 0) === 0 ? <button className="add-button" onClick={() => updateCart(p.id, 1)}><Plus size={16}/> Add</button> :
                      <div className="quantity"><button onClick={() => updateCart(p.id, -1)} aria-label="Remove one"><Minus size={14}/></button><b>{cart[p.id]}</b><button onClick={() => updateCart(p.id, 1)} aria-label="Add one"><Plus size={14}/></button></div>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <div className="empty"><span>🛒</span><h3>No products found</h3><p>Try another search or choose a different category.</p><button onClick={() => {setSearch("");setCategory("All");setStore("All stores");}}>Clear filters</button></div>}
          <p className="demo-note">Demo catalogue · Product names, prices and store listings are sample data and are not live inventory.</p>
        </section>
      </main>

      <footer><a className="brand" href="#"><span className="brand-mark"><ShoppingBasket size={18}/></span> freshcart<span className="brand-dot">.</span></a><span>Groceries made simpler.</span><span>© 2026 FreshCart</span></footer>

      {showCart && <div className="modal-backdrop" onClick={() => setShowCart(false)}>
        <aside className="cart-panel" onClick={e => e.stopPropagation()}>
          <div className="cart-head"><div><span className="eyebrow muted">YOUR SELECTION</span><h2>My basket ({count})</h2></div><button className="close-button" onClick={() => setShowCart(false)}><X/></button></div>
          <div className="cart-items">
            {products.filter(p => cart[p.id]).map(p => <div className="cart-item" key={p.id}><span className="cart-emoji">{p.emoji}</span><div className="cart-item-info"><b>{p.name}</b><small>{p.store} · ₹{p.price} each</small><div className="quantity"><button onClick={() => updateCart(p.id, -1)}><Minus size={13}/></button><b>{cart[p.id]}</b><button onClick={() => updateCart(p.id, 1)}><Plus size={13}/></button></div></div><strong>₹{p.price * cart[p.id]}</strong></div>)}
            {count === 0 && <div className="empty"><span>🧺</span><h3>Your basket is empty</h3><p>Add products to see them here.</p></div>}
          </div>
          <div className="cart-total"><span>Estimated total</span><strong>₹{total}</strong></div>
          <p className="cart-disclaimer">This is a demo basket. Orders and payments are not enabled.</p>
          <button className="checkout-button" onClick={() => setShowCart(false)}>Continue browsing</button>
        </aside>
      </div>}
    </div>
  );
}

export default App;
