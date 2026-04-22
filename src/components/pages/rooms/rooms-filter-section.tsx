type SortOption = 'price-asc' | 'price-desc' | 'name';

interface RoomsFiltersProps {
  checkIn: string;
  checkOut: string;
  typeFilter: string;
  sortBy: SortOption;
  setCheckIn: (value: string) => void;
  setCheckOut: (value: string) => void;
  setTypeFilter: (value: string) => void;
  setSortBy: (value: SortOption) => void;
}

export default function RoomsFilterSection({
  checkIn,
  checkOut,
  typeFilter,
  sortBy,
  setCheckIn,
  setCheckOut,
  setTypeFilter,
  setSortBy,
}: RoomsFiltersProps) {
  return (
    <section className="py-8 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white elegant-shadow elegant-border rounded-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Tipo
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">Todos</option>
                <option value="familiar">Familiar</option>
                <option value="matrimonial">Matrimonial</option>
                <option value="doble">Doble</option>
                <option value="individual">Individual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Ordenar
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
