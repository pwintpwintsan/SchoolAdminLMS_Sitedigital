
import React, { useState, useMemo } from 'react';
import { FileText, PlayCircle, Download, ExternalLink, Filter, Search, FileSearch, Sparkles, BookOpen, Plus, FileUp, X, Save, Trash2 } from 'lucide-react';

interface TeachingResourcesViewProps {
  checkPermission?: (category: any, action: string) => boolean;
}

const UploadAssetModal = ({ onClose, onUpload }: { onClose: () => void, onUpload: (asset: any) => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'PDF',
    book: 'Digital Kids V2',
    lang: 'English'
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-xl w-full shadow-2xl border-t-[12px] border-[#6366f1] relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-[#6366f1] text-white rounded-2xl shadow-xl">
            <FileUp size={28} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">Upload Asset</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Resource Repository</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Title</label>
            <input 
              type="text" 
              placeholder="e.g. Logic Gates Guide" 
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#6366f1] transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Resource Type</label>
              <select 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#6366f1] transition-all uppercase appearance-none"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option>PDF</option>
                <option>Video</option>
                <option>DOCX</option>
                <option>Image</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Book Series</label>
              <select 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#6366f1] transition-all uppercase appearance-none"
                value={formData.book}
                onChange={(e) => setFormData({...formData, book: e.target.value})}
              >
                <option>Digital Kids V1</option>
                <option>Digital Kids V2</option>
                <option>Digital Kids V3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button onClick={onClose} className="flex-1 py-4 px-6 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
          <button 
            onClick={() => {
              if (!formData.title) return alert("Please enter a title");
              onUpload({ ...formData, id: Date.now(), size: '1.2 MB' });
            }}
            className="flex-[2] py-4 px-6 bg-[#292667] text-[#fbee21] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#6366f1] hover:text-white shadow-lg transition-all border-b-4 border-black/10 active:scale-95"
          >
            <Save size={18} /> Confirm Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export const TeachingResourcesView: React.FC<TeachingResourcesViewProps> = ({ checkPermission }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookFilter, setBookFilter] = useState('All Series');
  const [resources, setResources] = useState([
    { id: 1, title: 'Teacher Guide: Introduction to Logic', type: 'PDF', size: '2.4 MB', lang: 'English', book: 'Digital Kids V2' },
    { id: 2, title: 'Animated Module 1: Binary Concepts', type: 'Video', size: '45 MB', lang: 'English', book: 'Digital Kids V1' },
    { id: 3, title: 'Worksheet: Pattern Recognition', type: 'DOCX', size: '1.1 MB', lang: 'Spanish', book: 'Digital Kids V2' },
    { id: 4, title: 'Classroom Activity: Card Sorting', type: 'PDF', size: '3.8 MB', lang: 'Portuguese', book: 'Digital Kids V3' },
  ]);

  const canUpload = checkPermission?.('resources', 'upload') ?? true;
  const canDelete = checkPermission?.('resources', 'delete') ?? true;

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBook = bookFilter === 'All Series' || res.book === bookFilter;
      return matchesSearch && matchesBook;
    });
  }, [resources, searchTerm, bookFilter]);

  const handleUpload = (newAsset: any) => {
    setResources([newAsset, ...resources]);
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {isUploadModalOpen && (
        <UploadAssetModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={handleUpload} 
        />
      )}

      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#6366f1] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#6366f1] rounded-[2rem] text-white shadow-xl rotate-3">
             <FileSearch size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Teaching <span className="text-[#fbee21]">Library</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">RESOURCES ACTIVE</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Official Global Assets</span>
             </div>
           </div>
        </div>
        {canUpload && (
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-4 px-10 py-5 bg-[#fbee21] text-[#292667] rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-6 border-black/10 relative z-10"
          >
            <FileUp size={28} strokeWidth={3} />
            <span>Upload New Asset</span>
          </button>
        )}
      </div>

      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col xl:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#6366f1]">
          <Search size={24} className="text-slate-400" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search by book title or topic..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-lg font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          {filteredResources.map((res) => (
            <div key={res.id} className="bg-white rounded-[3rem] p-8 border-2 border-slate-100 hover:border-[#6366f1] transition-all group shadow-lg flex items-start gap-6 relative overflow-hidden">
              <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-6 shadow-md ${res.type === 'Video' ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-[#ec2027]'}`}>
                {res.type === 'Video' ? <PlayCircle size={32} strokeWidth={2.5} /> : <FileText size={32} strokeWidth={2.5} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#ec2027] bg-red-50 px-2.5 py-1 rounded-full">{res.type}</span>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{res.size}</span>
                </div>
                <h4 className="text-lg font-black text-[#292667] uppercase tracking-tight leading-snug group-hover:text-[#6366f1] transition-colors">{res.title}</h4>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => alert(`Downloading ${res.title}...`)}
                  className="p-3 bg-[#292667] text-white rounded-xl shadow-xl hover:bg-[#00a651] transition-all active:scale-95"
                >
                  <Download size={20} strokeWidth={3} />
                </button>
                {canDelete && (
                  <button 
                    onClick={() => handleDelete(res.id)}
                    className="p-3 bg-slate-50 text-slate-400 hover:text-white hover:bg-[#ec2027] rounded-xl transition-all active:scale-90"
                  >
                    <Trash2 size={20} strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
