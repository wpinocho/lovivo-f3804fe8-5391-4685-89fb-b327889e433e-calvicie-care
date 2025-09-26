import { useEffect, useState } from 'react';
import { supabase, type Product, type Collection, type Blog } from '@/lib/supabase';
import { STORE_ID } from '@/lib/config';

/**
 * FORBIDDEN FILE - HeadlessIndex
 * 
 * Contiene toda la lógica de negocio para la página principal.
 * No modificar - protege funcionalidades críticas del ecommerce.
 */

export interface UseIndexLogicReturn {
  // Data
  products: Product[];
  collections: Collection[];
  blogs: Blog[];
  
  // Loading states
  loading: boolean;
  loadingCollections: boolean;
  loadingBlogs: boolean;
  
  // Search and filtering
  searchTerm: string;
  selectedCollectionId: string | null;
  filteredProducts: Product[];
  
  // Actions
  setSearchTerm: (term: string) => void;
  handleViewCollectionProducts: (collectionId: string) => Promise<void>;
  handleShowAllProducts: () => void;
}

export const useIndexLogic = (): UseIndexLogicReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCollections();
    fetchBlogs();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Products fetched:', data);
      console.log('Number of products:', data?.length);
      
      if (data && data.length > 0) {
        console.log('First product:', data[0]);
        console.log('First product images:', data[0].images);
      }
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      console.log('Fetching collections...');
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase collections error:', error);
        throw error;
      }

      console.log('Collections fetched:', data);
      console.log('Number of collections:', data?.length);
      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoadingCollections(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      console.log('Fetching blogs...');
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('status', 'published')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase blogs error:', error);
        throw error;
      }

      console.log('Blogs fetched:', data);
      console.log('Number of blogs:', data?.length);
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleViewCollectionProducts = async (collectionId: string) => {
    try {
      console.log('Fetching products for collection:', collectionId);

      // First get the product IDs from collection_products
      const { data: collectionProducts, error: cpError } = await supabase
        .from('collection_products')
        .select('product_id')
        .eq('collection_id', collectionId);

      if (cpError) {
        console.error('Error fetching collection products:', cpError);
        return;
      }

      if (!collectionProducts || collectionProducts.length === 0) {
        console.log('No products found in this collection');
        setProducts([]);
        setSelectedCollectionId(collectionId);
        return;
      }

      const productIds = collectionProducts.map(cp => cp.product_id);

      // Then get the actual products
      const { data: collectionProductsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .in('id', productIds);

      if (productsError) {
        console.error('Error fetching products:', productsError);
        return;
      }

      console.log('Collection products fetched:', collectionProductsData);
      setProducts(collectionProductsData || []);
      setSelectedCollectionId(collectionId);
      setSearchTerm('');
    } catch (error) {
      console.error('Error in handleViewCollectionProducts:', error);
    }
  };

  const handleShowAllProducts = () => {
    setSelectedCollectionId(null);
    setSearchTerm('');
    fetchProducts();
  };

  const isInStock = (p: Product) => {
    const anyP: any = p as any;
    // If track_inventory is false, always show as in stock
    if (anyP.track_inventory === false) return true;
    
    if (typeof anyP.inventory_quantity === 'number') return (anyP.inventory_quantity || 0) > 0;
    if (Array.isArray(anyP.variants) && anyP.variants.length > 0) {
      return anyP.variants.some((v: any) => (v?.inventory_quantity ?? 0) > 0);
    }
    return true;
  };

  const filteredProducts = products
    .filter(isInStock)
    .filter(product =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return {
    products,
    collections,
    blogs,
    loading,
    loadingCollections,
    loadingBlogs,
    searchTerm,
    selectedCollectionId,
    filteredProducts,
    setSearchTerm,
    handleViewCollectionProducts,
    handleShowAllProducts,
  };
};

interface HeadlessIndexProps {
  children: (logic: UseIndexLogicReturn) => React.ReactNode;
}

export const HeadlessIndex = ({ children }: HeadlessIndexProps) => {
  const logic = useIndexLogic();
  return <>{children(logic)}</>;
};