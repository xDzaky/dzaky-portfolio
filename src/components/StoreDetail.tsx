import { useState, useEffect } from "react";
import { storeProducts } from "@/data/portfolio";
import { ArrowLeft, ShoppingCart, CheckCircle2, Cpu, Sparkles, Trophy, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

type StoreDetailProps = {
  slug: string | null;
};

export function StoreDetail({ slug }: StoreDetailProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const product = storeProducts.find((p) => p.slug === slug);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-foreground">Produk Tidak Ditemukan</h2>
        <p className="text-muted-foreground mt-2">Maaf, template website yang Anda cari tidak tersedia.</p>
        <a href="#/store" className="mt-6">
          <Button>Kembali ke Store</Button>
        </a>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const waUrl = `https://wa.me/6281216494184?text=${encodeURIComponent(
    `Halo Dzaky, saya tertarik untuk membeli website "${product.title}" (${formatPrice(product.discountPrice)}). Bagaimana langkah selanjutnya?`
  )}`;

  return (
    <section className="py-20 bg-background text-foreground relative overflow-hidden min-h-screen">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.hash = "#/store";
              }
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Store
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Details (Sticky on Desktop) */}
          <div className="md:col-span-5 space-y-6 md:sticky md:top-20">
            {/* Category and Title */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl font-black tracking-tight text-foreground leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price Card */}
            <div className="p-6 rounded-3xl border border-border bg-card/40 backdrop-blur-sm shadow-md space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Harga Spesial</p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-lg text-muted-foreground line-through decoration-destructive decoration-2">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-3xl font-black text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
                    {formatPrice(product.discountPrice)}
                  </span>
                </div>
              </div>

              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button size="lg" className="w-full rounded-2xl cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border-none flex items-center justify-center gap-2 py-6 text-base font-bold shadow-lg shadow-emerald-950/20">
                  <ShoppingCart className="size-5" />
                  Beli via WhatsApp
                </Button>
              </a>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Cpu className="size-4 text-primary" /> Deskripsi
              </h3>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                {product.longDescription ? (
                  product.longDescription.map((desc, i) => <p key={i}>{desc}</p>)
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Trophy className="size-4 text-primary" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-semibold text-muted-foreground bg-muted border border-border/50 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="size-4 text-primary" /> Fitur Unggulan
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Seamless Stacked Screenshots (Scrollable) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Preview Desain ({product.images.length} Halaman)
              </span>
              <button
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold cursor-pointer"
              >
                <Maximize2 className="size-3.5" /> Fullscreen Mode
              </button>
            </div>

            {/* Seamless Stack Wrapper */}
            <div 
              className="flex flex-col w-full rounded-3xl overflow-hidden border border-border bg-card/20 backdrop-blur-sm cursor-zoom-in shadow-xl hover:border-primary/20 transition-colors"
              onClick={() => setIsFullscreen(true)}
            >
              {product.images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${product.title} detail part ${index + 1}`}
                  className="w-full h-auto block"
                  style={{ margin: 0, padding: 0 }}
                  loading="lazy"
                />
              ))}
            </div>
            
            <p className="text-center text-xs text-muted-foreground mt-2">
              Klik gambar untuk melihat dalam ukuran penuh (scrollable lightbox)
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto"
          >
            {/* Modal Navigation/Control Bar */}
            <div className="sticky top-0 left-0 right-0 w-full bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between z-10 max-w-4xl mx-auto rounded-b-2xl shadow-lg">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">{product.title}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Scroll kebawah untuk melihat detail lengkap</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-none text-xs">
                    <ShoppingCart className="size-3.5 mr-1" /> Beli Website
                  </Button>
                </a>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-full border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Tutup detail preview"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Seamless 1:1 image list container */}
            <div className="w-full max-w-3xl px-4 py-8 flex flex-col items-center justify-start gap-0">
              {product.images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${product.title} preview part ${index + 1}`}
                  className="w-full h-auto block shadow-md"
                  style={{ margin: 0, padding: 0 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
