import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Phone, Mail } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white shadow-sm border-b ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">HairCure</h1>
                <p className="text-xs text-muted-foreground">Tratamientos Capilares</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Inicio
              </Link>
              <Link 
                to="/tratamientos" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Tratamientos
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Blog
              </Link>
              <Link 
                to="/contacto" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Cart and Contact */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+34 900 123 456</span>
            </div>
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-primary/10"
              >
                <ShoppingCart className="h-5 w-5 text-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-gray-900 text-white py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HC</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">HairCure</h3>
                <p className="text-sm text-gray-400">Tratamientos Capilares</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Especialistas en tratamientos para la calvicie con productos clínicamente probados. 
              Más de 10,000 clientes han recuperado su confianza con nosotros.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300">+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-300">info@haircure.es</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Productos</h3>
            <div className="space-y-2">
              <Link 
                to="/tratamientos-orales" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Tratamientos Orales
              </Link>
              <Link 
                to="/soluciones-topicas" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Soluciones Tópicas
              </Link>
              <Link 
                to="/kits-completos" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Kits Completos
              </Link>
              <Link 
                to="/vitaminas" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Vitaminas
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Soporte</h3>
            <div className="space-y-2">
              <Link 
                to="/como-funciona" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                ¿Cómo Funciona?
              </Link>
              <Link 
                to="/garantia" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Garantía
              </Link>
              <Link 
                to="/envios" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Envíos
              </Link>
              <Link 
                to="/contacto" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 HairCure. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacidad
              </Link>
              <Link to="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos
              </Link>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}