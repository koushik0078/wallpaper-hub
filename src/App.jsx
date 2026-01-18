import { useState } from 'react'
import { downloadSites, aiTools, prompts, software } from './data/resources'
import { Globe, Palette, Monitor, PenTool, Check, Copy, ExternalLink, Sparkles } from 'lucide-react'
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

function App() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex'; // show fallback icon
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Search State
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const API_KEY = "AIzaSyB0HY3u_8tqWsCg3UshU-odIvfr5Mk7yD0";
  // Placeholder CX (Search Engine ID). User needs to provide this or use a default if available.
  // Using a generic public one or asking user. For now, we'll try to fetch and show error if it fails prompting for CX.
  const [cx, setCx] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    // Check for CX
    if (!cx) {
      setSearchError('Search Engine ID (CX) is required. Please enter it below to use the Google API.');
      return;
    }

    setLoading(true);
    setSearchError(null);
    setImages([]);

    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${cx}&q=${query}&searchType=image&num=8`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (data.items) {
        setImages(data.items);
      } else {
        setSearchError('No images found.');
      }
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageUrl) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = "_blank"; // Open in new tab since direct download might be blocked by CORS
    link.download = 'wallpaper.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container perspective-container">
      <div className="floating-shape shape-1" />
      <div className="floating-shape shape-2" />

      {/* Hero Section */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="section"
        style={{ textAlign: 'center', marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.div
          className="tag"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles size={14} style={{ marginRight: '6px' }} /> New 2026 Guide
        </motion.div>

        <h1 style={{ position: 'relative', display: 'inline-block' }}>
          Ultimate <span className="text-gradient">Wallpaper</span> Hub
        </h1>

        <motion.p
          style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Curated collection of high-quality download sites, AI tools, and ready-to-use prompts for your next desktop masterpiece.
        </motion.p>
      </motion.header>

      {/* Direct Search & Download */}
      <section className="section">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles className="text-gradient" size={32} /> Direct Search & Download
        </h2>

        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for wallpapers (e.g. 'Cyberpunk City')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn-3d">
            <span className="btn-content">Search</span>
          </button>
        </form>

        {/* CX Input for Demo Purpose */}
        {!images.length && !loading && (
          <div style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Note: To use the Google API, you must provide a valid Search Engine ID (CX).</p>
            <input
              type="text"
              placeholder="Enter your Search Engine ID (CX)"
              value={cx}
              onChange={(e) => setCx(e.target.value)}
              style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: '4px', color: 'white', width: '100%', maxWidth: '400px' }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Don't have one? Create one at <a href="https://cse.google.com/cse/all" target="_blank" style={{ color: 'var(--accent-cyan)' }}>cse.google.com</a>, enable "Image Search", and paste the ID here.
            </p>
          </div>
        )}

        {loading && <p style={{ textAlign: 'center' }}>Searching...</p>}
        {searchError && <p style={{ color: '#ef4444', textAlign: 'center' }}>{searchError}</p>}

        <div className="grid">
          {images.map((img, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="card" style={{ height: '100%' }}>
                <div className="card-content">
                  <div className="card-glare" />
                  <div style={{ height: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem' }}>
                    <img src={img.link} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.title}</h3>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <button className="btn-3d" onClick={() => handleDownload(img.link)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                      <span className="btn-content">Download <Check size={16} /></span>
                    </button>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Download Sites */}
      <section className="section">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe className="text-gradient" size={32} /> Best Download Sites
        </h2>
        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {downloadSites.map((site, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="card h-full" style={{ height: '100%' }}>
                <a href={site.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                  <div className="card-content">
                    <div className="card-glare" />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem', transform: 'translateZ(20px)' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', background: '#ffffff10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                        <img src={site.img} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={handleImageError} />
                        <Globe size={24} style={{ display: 'none' }} />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{site.name}</h3>
                    </div>
                    <p style={{ transform: 'translateZ(10px)' }}>{site.description}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'center', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, transform: 'translateZ(15px)' }}>
                      Visit Website <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                </a>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI Tools */}
      <section className="section">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Palette className="text-gradient" size={32} /> AI Wallpaper Generators
        </h2>
        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {aiTools.map((tool, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="card" style={{ height: '100%' }}>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                  <div className="card-content">
                    <div className="card-glare" />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem', transform: 'translateZ(20px)' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', background: '#ffffff10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                        <img src={tool.img} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={handleImageError} />
                        <Palette size={24} style={{ display: 'none' }} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{tool.name}</h3>
                        <span className="tag" style={{ marginTop: '0.5rem', marginBottom: 0 }}>{tool.type}</span>
                      </div>
                    </div>
                    <p style={{ marginTop: '0.5rem', transform: 'translateZ(10px)' }}>{tool.description}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'center', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, transform: 'translateZ(15px)' }}>
                      Try Tool <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                </a>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Software */}
      <section className="section">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Monitor className="text-gradient" size={32} /> Helpful Software
        </h2>
        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {software.map((item, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="card" style={{ height: '100%' }}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                  <div className="card-content">
                    <div className="card-glare" />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem', transform: 'translateZ(20px)' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', background: '#ffffff10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={handleImageError} />
                        <Monitor size={24} style={{ display: 'none' }} />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h3>
                    </div>
                    <p style={{ transform: 'translateZ(10px)' }}>{item.description}</p>
                    <div style={{ marginTop: '1rem', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', transform: 'translateZ(15px)' }}>
                      Visit Website <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                </a>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Prompts */}
      <section className="section">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PenTool className="text-gradient" size={32} /> Ready-Made Prompts
        </h2>
        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {prompts.map((prompt, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} className="card" style={{ height: '100%' }}>
                <div className="card-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                  <div className="card-glare" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, transform: 'translateZ(15px)' }}>
                    {prompt.category}
                  </span>
                  <p style={{ fontStyle: 'italic', flex: 1, color: '#e2e8f0', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', transform: 'translateZ(10px)' }}>
                    "{prompt.text}"
                  </p>
                  <button className="copy-btn" onClick={() => copyToClipboard(prompt.text, index)} style={{ transform: 'translateZ(20px)' }}>
                    {copiedIndex === index ? (
                      <>
                        <Check size={16} color="var(--success)" /> <span style={{ color: 'var(--success)' }}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <p>Built with ❤️ for Wallpaper Enthusiasts</p>
      </footer>
    </div>
  )
}

export default App
