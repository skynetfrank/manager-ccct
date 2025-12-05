import React, { useState, useMemo } from "react";
import { useGetProductsQuery } from "../api/productosApi";
import { LucideSearch, LucidePrinter } from "lucide-react"; // Importar LucidePrinter
import Tooltip from "../components/Tooltip"; // Importar Tooltip si no está ya
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination"; // Importar el componente Pagination

export default function ProductStockScreen() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [filterCodigo, setFilterCodigo] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [itemsPerPage] = useState(32); // Número de elementos por página

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let result = products.filter((product) => product.existencia > 0);

    if (filterCodigo) {
      result = result.filter((product) => product.codigo.toLowerCase().includes(filterCodigo.toLowerCase()));
    }

    // Sort strictly by codigo from lowest to highest
    result.sort((a, b) => a.codigo.localeCompare(b.codigo)); // Mantener el ordenamiento

    return result;
  }, [products, filterCodigo]);

  // Calcular datos para la paginación
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular la suma de existencias para la página actual
  const sumOfCurrentPage = useMemo(() => {
    return currentProducts.reduce((acc, product) => acc + product.existencia, 0);
  }, [currentProducts]);

  // Calcular la suma total de existencias para TODOS los productos filtrados (en todas las páginas)
  const totalSumOfFiltered = useMemo(() => {
    return filteredAndSortedProducts.reduce((acc, product) => acc + product.existencia, 0);
  }, [filteredAndSortedProducts]);

  // Manejador de cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrint = () => {
    window.print();
  };


  if (isLoading) {
    return <LoadingSpinner txt="Cargando inventario..." />;
  }

  if (isError) {
    return <div className="error">Error al cargar el inventario.</div>;
  }
  console.log("filterCodigo:", filterCodigo);
  return (
    <div className="product-stock-screen-container">
      <h2 className="centrado">
        Lista Codigos: {filterCodigo ? "Total General del Codigo " + filterCodigo.toUpperCase() +
          " " + totalSumOfFiltered + " Unidades" : "Total General: " + totalSumOfFiltered + " Unidades"}
      </h2>

      <div className="flx jstart"> {/* Contenedor para alinear búsqueda y botón de imprimir */}
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Filtrar por código..."
            value={filterCodigo}
            onChange={(e) => {
              setFilterCodigo(e.target.value);
              setCurrentPage(1); // Resetear a la primera página al filtrar
            }}
            className="search-input"
          />
        </div>
        <div className="flx gap-1">
          <LucidePrinter className="add-product-icon print-button" size={36} onClick={handlePrint} />

        </div>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron productos con existencia mayor a cero o que coincidan con la búsqueda.</p>
        </div>
      ) : ( // Usar currentProducts en lugar de filteredAndSortedProducts
        <div className="table-responsive-container">
          <table className="product-stock-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Marca</th>
                <th>Existencia</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.codigo}</td>
                  <td className="td-marca">{product.marca}</td>
                  <td>{product.existencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="centrado"><strong>Total esta Pagina #{currentPage}: {sumOfCurrentPage} Unidades</strong></p>
          {/* Renderizar el componente de paginación */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}
