'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryItem } from '@/features/states/CategorySlice';

const HomepageCategories = () => {
  const categories = useSelector((state: RootState) => state.category.data);

  return (
    <section className="py-12 w-[90%] mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-primary">Shop By Categories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((category: CategoryItem) => (
          <Link href={`/categories/${category._id}`} key={category._id}>
            <Card className="shadow-none hover:shadow-xl rounded-md transition-all duration-300 h-full border-2 border-gray-100">
              <CardContent className="flex flex-col items-center p-3">
                <div className="text-sm text-primary font-normal text-center text-gray-800">
                  {category?.name}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomepageCategories;
