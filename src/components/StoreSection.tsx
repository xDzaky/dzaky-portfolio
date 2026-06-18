import { motion } from "motion/react";
import { storeProducts } from "@/data/portfolio";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StoreSection() {
  // Show up to 3 products in the landing page section
  const displayedProducts = storeProducts.slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="store-preview" className="py-24 bg-background text-foreground overflow-hidden border-t border-border/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Premium Store.
            </h2>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
              Template &amp; Website Siap Pakai Untuk Bisnis Anda
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedProducts.map((product, idx) => {
            const waUrl = `https://wa.me/6281216494184?text=${encodeURIComponent(
              `Halo Dzaky, saya tertarik untuk membeli website "${product.title}" (${formatPrice(product.discountPrice)}). Bagaimana langkah selanjutnya?`
            )}`;

            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-3xl border border-border bg-card/45 backdrop-blur-sm overflow-hidden flex flex-col h-full shadow-lg group hover:border-primary/30 transition-all duration-300"
              >
                {/* Product Cover Image */}
                <div 
                  className="h-48 w-full overflow-hidden relative cursor-pointer"
                  onClick={() => {
                    window.location.hash = `#/store/${product.slug}`;
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-border">
                    {product.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 
                      className="text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => {
                        window.location.hash = `#/store/${product.slug}`;
                      }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Stack / Badges */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {product.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-semibold bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {product.stack.length > 4 && (
                        <span className="text-[9px] font-semibold bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded">
                          +{product.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-4 border-t border-border/40 space-y-4">
                    {/* Price display */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-muted-foreground line-through decoration-destructive decoration-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-lg font-black text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
                        {formatPrice(product.discountPrice)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full cursor-pointer text-xs"
                        onClick={() => {
                          window.location.hash = `#/store/${product.slug}`;
                        }}
                      >
                        <Eye className="size-3.5 mr-1" />
                        Detail
                      </Button>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button
                          size="sm"
                          className="w-full cursor-pointer text-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                        >
                          <ShoppingCart className="size-3.5 mr-1" />
                          Beli
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Store Button */}
        <div className="flex justify-center mt-12">
          <a href="#/store">
            <Button variant="outline" size="lg" className="group cursor-pointer">
              Lihat Semua Website ({storeProducts.length})
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
