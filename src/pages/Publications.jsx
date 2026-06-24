import React, { useState, useMemo } from 'react';
import { publications, researchAreas } from '@/lib/publications-data';
import { Search, Download, ChevronDown, ChevronUp, BookOpen, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/shared/SectionHeading';

const ITEMS_PER_PAGE = 10;

export default function Publications() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  const years = useMemo(() => {
    const y = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
    return ['All', ...y.map(String)];
  }, []);

  const filtered = useMemo(() => {
    let result = [...publications];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.journal.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    }
    if (yearFilter !== 'All') result = result.filter(p => String(p.year) === yearFilter);
    if (areaFilter !== 'All') result = result.filter(p => p.tag === areaFilter);
    result.sort((a, b) => sortBy === 'newest' ? b.year - a.year : a.year - b.year);
    return result;
  }, [search, yearFilter, areaFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Publications" subtitle="Peer-reviewed research across geophysics, GIS, and educational technology" />

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Filter className="w-4 h-4" />
            <span>{filtered.length} publication{filtered.length !== 1 ? 's' : ''} found</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search publications..."
                className="pl-9"
              />
            </div>
            <Select value={yearFilter} onValueChange={v => { setYearFilter(v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
              <SelectContent>
                {years.map(y => <SelectItem key={y} value={y}>{y === 'All' ? 'All Years' : y}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={areaFilter} onValueChange={v => { setAreaFilter(v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="Research Area" /></SelectTrigger>
              <SelectContent>
                {researchAreas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Publication Cards */}
        <div className="space-y-4">
          {paginated.map(pub => (
            <div key={pub.id} className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:border-gold/30 transition-colors">
              <div className="flex flex-wrap items-start gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{pub.tag}</span>
                <span className="text-xs text-muted-foreground ml-auto font-mono">{pub.year}</span>
              </div>
              <h3 className="font-heading font-semibold text-base sm:text-lg leading-snug mb-2">{pub.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
              <p className="text-sm text-muted-foreground italic mb-3">
                {pub.journal}
                {pub.volume ? `, ${pub.volume}` : ''}
                {pub.pages ? `, pp. ${pub.pages}` : ''}
              </p>
              {pub.doi && (
                <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gold hover:underline block mb-3">
                  DOI: {pub.doi}
                </a>
              )}
              
              {/* Abstract toggle */}
              <button
                onClick={() => setExpandedId(expandedId === pub.id ? null : pub.id)}
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-3"
              >
                {expandedId === pub.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {expandedId === pub.id ? 'Hide Abstract' : 'Show Abstract'}
              </button>
              {expandedId === pub.id && (
                <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg mb-3 italic">
                  Abstract content will be added soon. Please refer to the full paper via the download link below.
                </p>
              )}

              <div>
                <a
                  href={pub.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        {paginated.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No publications match your search criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-4">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}