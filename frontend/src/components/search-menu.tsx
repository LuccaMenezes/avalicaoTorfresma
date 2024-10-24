import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { sidelinks } from '@/data/sidelinks';
import { useNavigate } from 'react-router-dom';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredLinks = sidelinks
    .map((link) => {
      const isLinkMatch = link.title.toLowerCase().includes(searchTerm.toLowerCase());
      const filteredSubLinks = link.sub
        ? link.sub.filter((subLink) =>
            subLink.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : []; // Garantir que filteredSubLinks seja um array

      return {
        ...link,
        isMatch: isLinkMatch || filteredSubLinks.length > 0,
        sub: filteredSubLinks.length > 0 ? filteredSubLinks : undefined,
      };
    })
    .filter((link) => link.isMatch);

  const handleClick = (href: string) => {
    navigate(href);
  };

  return (
    <div className="relative w-full">
      <Input
        type="search"
        placeholder="Buscar"
        className="md:w-[100px] lg:w-[300px] py-2 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-gray-900 dark:text-gray-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <div className="absolute z-10 md:w-[100px] lg:w-[300px] mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredLinks.map((link) => (
            <div key={link.href} className="border-b border-gray-200 dark:border-gray-700">
              <div
                onClick={() => handleClick(link.href)}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                role="button"
                tabIndex={0}
              >
                <span className="mr-2">{link.icon}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{link.title}</span>
              </div>
              {link.sub && link.sub.length > 0 && (
                <div className="pl-6 border-t border-gray-200 dark:border-gray-700">
                  {link.sub.map((subLink) => (
                    <div
                      key={subLink.href}
                      onClick={() => handleClick(subLink.href)}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      role="button"
                      tabIndex={0}
                    >
                      <span className="mr-2">{subLink.icon}</span>
                      <span className="text-gray-900 dark:text-gray-100">{subLink.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
