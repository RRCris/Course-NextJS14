'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_SEARCHES = 800;

export default function Search({ placeholder }: { placeholder: string }) {
  const SP = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const params = new URLSearchParams(SP);
    if (e.target.value) {
      params.set('query', e.target.value);
    } else {
      params.delete('query');
    }
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  };

  const handleDebouce = useDebouncedCallback(
    handleSearch,
    WAIT_BETWEEN_SEARCHES,
  );
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        defaultValue={SP.get('query')?.toString()}
        onChange={handleDebouce}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
