import React from 'react';
import { Pagination } from './atoms/Pagination/Pagination';

function PaginationComponentExamples() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Pagination Examples</h1>

      {/* Basic Pagination */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Basic Pagination</h2>
        <Pagination
          page={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </section>

      {/* With Page Size Selector */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">With Page Size Selector</h2>
        <Pagination
          page={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          showPageSize
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </section>

      {/* Different Sizes */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Different Sizes</h2>
        <div className="space-y-4">
          <Pagination
            page={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            size="sm"
          />
          <Pagination
            page={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            size="md"
          />
          <Pagination
            page={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            size="lg"
          />
        </div>
      </section>

      {/* Different Shapes */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Different Shapes</h2>
        <div className="space-y-4">
          <Pagination
            page={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            shape="square"
          />
          <Pagination
            page={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            shape="rounded"
          />
          <Pagination
            page={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            shape="pill"
          />
        </div>
      </section>

      {/* Many Pages */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Many Pages (100+)</h2>
        <Pagination
          page={currentPage}
          totalPages={100}
          onPageChange={setCurrentPage}
          siblingCount={2}
        />
      </section>
    </div>
  );
}

export default PaginationComponentExamples;
