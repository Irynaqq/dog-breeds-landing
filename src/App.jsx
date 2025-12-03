import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  // Load all breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      setLoadingBreeds(true);
      const res = await axios.get("https://dog.ceo/api/breeds/list/all");
      const list = Object.keys(res.data.message);
      setBreeds(list);
      setSelectedBreed(list[0] || "");
      setLoadingBreeds(false);
    };

    fetchBreeds();
  }, []);

  // Load image when breed changes
  useEffect(() => {
    if (!selectedBreed) return;

    const fetchImage = async () => {
      setLoadingImage(true);
      const res = await axios.get(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random`
      );
      setImageUrl(res.data.message);
      setLoadingImage(false);
    };

    fetchImage();
  }, [selectedBreed]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800 sticky top-0 bg-slate-900/80 backdrop-blur z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">DogWorld</h1>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#popular" className="hover:text-white">Popular</a>
            <a href="#explore" className="hover:text-white">Explore</a>
            <a href="#about" className="hover:text-white">About</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Dog Breeds & Find Your Perfect Match
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Explore temperament, energy levels and appearance of dogs from all
          around the world. Powered by Dog API.
        </p>

        <a
          href="#explore"
          className="inline-block mt-8 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-full"
        >
          Explore Breeds
        </a>
      </section>

      {/* POPULAR BREEDS */}
      <section id="popular" className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold mb-6">Popular Breeds</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["labrador", "husky", "beagle", "pug"].map((breed) => (
            <div
              key={breed}
              className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
            >
              <h4 className="text-lg font-bold capitalize mb-2">{breed}</h4>
              <p className="text-sm text-slate-400">
                Friendly, loyal and great with families.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE BREEDS */}
      <section
        id="explore"
        className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-800"
      >
        <h3 className="text-2xl font-semibold mb-6">Explore All Breeds</h3>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Choose a breed
            </label>

            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              {loadingBreeds && <option>Loading...</option>}
              {!loadingBreeds &&
                breeds.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
            </select>
          </div>

          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 min-h-[300px] flex items-center justify-center">
            {loadingImage ? (
              <p className="text-slate-300">Loading image...</p>
            ) : (
              imageUrl && (
                <img
                  src={imageUrl}
                  alt={selectedBreed}
                  className="rounded-xl max-h-80 object-cover"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-800"
      >
        <h3 className="text-2xl font-semibold mb-4">Why Dogs?</h3>
        <p className="text-slate-300 max-w-3xl">
          Dogs are loyal companions, emotional support and family members.
          Different breeds offer different personalities, and exploring them
          helps you find the perfect match. This demo uses Dog API and Tailwind
          v4 to create a modern interactive landing page.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-800">
        DogWorld · Built with React + Tailwind CSS v4 · Powered by Dog API
      </footer>
    </div>
  );
}
