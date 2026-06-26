import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Video, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SectionHeading from '@/components/shared/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const tutorialVideos = [
  { title: "Navigating Virtual Classroom (Canvas)", url: "https://drive.google.com/file/d/1rzyexHmVS89tR3tnr4bwO_vzqBSDjNlb/view?usp=sharing" },
  { title: "Navigating Virtual Classroom (Moodle)", url: "https://drive.google.com/file/d/1_4cPCbV7EJQkrePtOIB7KizOIKsG1T9X/view?usp=sharing" },
  { title: "Assignment Submission (Undergraduate) Tutorial", url: "https://drive.google.com/file/d/1mMW5766HZANpAojWT3jkafbnR6nWNqT-/view?usp=sharing" },
  { title: "Departmental Registration & Viewer (Undergraduate) Tutorial", url: "https://drive.google.com/file/d/1df-ZkiXgrcnAFlT_mmMiTnZRX7XE25ym/view?usp=sharing" },
  { title: "Final Year Project (FYP) Submission & View Tutorial", url: "https://drive.google.com/file/d/1WEpz8h5tAiO7NHb4rM1muHtClXtSdyzo/view?usp=sharing" },
  { title: "Installing ONLYOFFICE", url: "https://drive.google.com/file/d/1nWx7XL5SbhIT-BfQDsDe-tAm1lDB9sem/view?usp=sharing" },
  { title: "Installing EndNote 20", url: "https://drive.google.com/file/d/1obcq1sfwo7YBGZSLluxXobg_SVKiuXaU/view?usp=sharing" },
  { title: "Using EndNote 20 – Part 1", url: "https://drive.google.com/file/d/1o6j_5MosfeeV8iRAONdbDCi4udyMZlLN/view?usp=sharing" },
  { title: "Using EndNote 20 – Part 2", url: "https://drive.google.com/file/d/1PxWgotrHw9uc0b-VL4xpgM0cupiul1H3/view?usp=sharing" },
  { title: "Using EndNote 20 – Part 3", url: "https://drive.google.com/file/d/1Ya2kNr6veMT3zgwcGvheygCzHgE2sKTG/view?usp=sharing" },
  { title: "Using EndNote 20 – Part 4", url: "https://drive.google.com/file/d/1Iu3_0KYKmBsYuDz575e0qoTtY4xDegsg/view?usp=sharing" },
];

const categories = ["All", "GIS & Mapping", "Geophysics", "Programming Tutorials", "Educational Technology", "Research Methods", "Career Advice"];

const samplePosts = [
  {
    id: 1,
    title: "Getting Started with QGIS for Spatial Analysis",
    excerpt: "A beginner-friendly guide to setting up QGIS and performing your first spatial analysis on geospatial data, covering installation, data import, and basic geoprocessing.",
    category: "GIS & Mapping",
    date: "Coming Soon",
    author: "Dr. Abel U. Osagie"
  },
  {
    id: 2,
    title: "Understanding Seismic Tomography: Principles and Applications",
    excerpt: "An introduction to seismic tomography methods, ray tracing algorithms, and how subsurface velocity models are constructed from earthquake data.",
    category: "Geophysics",
    date: "Coming Soon",
    author: "Dr. Abel U. Osagie"
  },
  {
    id: 3,
    title: "Building Educational Tools with Google Apps Script",
    excerpt: "Learn how to automate academic workflows, build custom submission systems, and create web applications using Google Apps Script for educators.",
    category: "Programming Tutorials",
    date: "Coming Soon",
    author: "Dr. Abel U. Osagie"
  },
  {
    id: 4,
    title: "Tips for Writing a Successful Research Proposal",
    excerpt: "Practical advice on structuring your research proposal, writing a compelling literature review, and presenting a clear methodology for academic grants.",
    category: "Research Methods",
    date: "Coming Soon",
    author: "Dr. Abel U. Osagie"
  },
  {
    id: 5,
    title: "Python Libraries Every Geoscientist Should Know",
    excerpt: "A curated overview of essential Python libraries for geoscience research including NumPy, SciPy, ObsPy, Matplotlib, and GeoPandas for data analysis.",
    category: "Programming Tutorials",
    date: "Coming Soon",
    author: "Dr. Abel U. Osagie"
  },
  {
    id: 6,
    title: "Career Paths in Geophysics: From Academia to Industry",
    excerpt: "Exploring diverse career opportunities for geophysicists in academia, oil and gas, mining, environmental consulting, and government agencies.",
    category: "Career Advice",
    date: "Coming Soon",
    author: "Dr. Abel U. Osagie"
  }
];

function BlogCard({ post }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl overflow-hidden hover:border-gold/40 hover:shadow-lg transition-all duration-500 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="h-40 bg-gradient-to-br from-navy/10 to-gold/10 dark:from-navy/30 dark:to-gold/5 flex items-center justify-center relative">
        <span className="font-heading text-5xl font-bold text-gold/20">{post.id}</span>
        <span className="absolute top-3 right-3 text-xs px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">
          {post.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-base leading-snug mb-2">{post.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
        </div>
        <div className="pt-3 border-t border-border">
          <span className="inline-flex items-center gap-1 text-sm text-gold opacity-60 cursor-not-allowed">
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs text-muted-foreground ml-2 italic">— Sample Post</span>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = samplePosts.filter(post => {
    const matchSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || post.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Blog" subtitle="Insights, tutorials, and perspectives on geophysics, GIS, programming, and academia" />

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-gold text-navy'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => <BlogCard key={post.id} post={post} />)}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No articles match your search.</p>
        )}

        {/* Tutorial Videos */}
        <div className="mt-20">
          <SectionHeading title="Tutorial Videos" subtitle="Step-by-step video guides for academic tools, platforms, and software" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tutorialVideos.map((video, idx) => (
              <a
                key={idx}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:border-gold/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">{video.title}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
                    Watch on Drive <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}