import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './atoms/Breadcrumbs/Breadcrumbs';
import { ChevronRight, Home } from 'lucide-react';

function BreadcrumbsComponentExamples() {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/products/categories' },
    { label: 'Electronics', href: '/products/categories/electronics' },
    { label: 'Laptops', active: true }
  ];

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Breadcrumbs Examples</h1>

      {/* Basic Breadcrumbs */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Basic Breadcrumbs</h2>
        <Breadcrumbs items={items} />
      </section>

      {/* With Home Icon */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">With Home Icon</h2>
        <Breadcrumbs items={items} showHomeIcon />
      </section>

      {/* Custom Separator */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Custom Separator</h2>
        <Breadcrumbs
          items={items}
          separator={<span className="text-gray-400">/</span>}
        />
      </section>

      {/* Collapsed Breadcrumbs */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Collapsed Breadcrumbs</h2>
        <Breadcrumbs items={items} maxItems={3} />
      </section>

      {/* With Icons */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Breadcrumbs with Icons</h2>
        <Breadcrumbs
          items={[
            {
              label: 'Dashboard',
              href: '/dashboard',
              icon: <Home className="h-4 w-4" />
            },
            {
              label: 'Settings',
              href: '/dashboard/settings',
              icon: <span>⚙️</span>
            },
            {
              label: 'Profile',
              active: true,
              icon: <span>👤</span>
            }
          ]}
        />
      </section>
    </div>
  );
}

export default BreadcrumbsComponentExamples;
