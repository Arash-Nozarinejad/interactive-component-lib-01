import React from 'react';

// Base Props interface
interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

// Card Props
interface CardProps extends BaseProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  hoverEffect?: boolean;
}

// Subcomponent Props
interface CardHeaderProps extends BaseProps {}
interface CardTitleProps extends BaseProps {}
interface CardContentProps extends BaseProps {}
interface CardFooterProps extends BaseProps {}

// Main Card component
const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  onClick,
  hoverEffect = false,
  className = '',
}: CardProps) => {
  // Style maps using template literals for better readability
  const baseStyles = `
    rounded-lg
    overflow-hidden
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const variantStyles = {
    default: 'bg-white shadow',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-white border border-gray-200',
    flat: 'bg-gray-50'
  };

  const paddingStyles = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  // Composed styles
  const cardStyles = [
    baseStyles,
    variantStyles[variant],
    paddingStyles[padding],
    hoverEffect && 'transition-shadow duration-200 hover:shadow-md',
    className
  ].filter(Boolean).join(' ').trim();

  return (
    <div 
      onClick={onClick}
      className={cardStyles}
    >
      {children}
    </div>
  );
};

// Subcomponents with simplified implementation
const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`mb-4 ${className}`.trim()}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }: CardTitleProps) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`.trim()}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`text-gray-700 ${className}`.trim()}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`.trim()}>
    {children}
  </div>
);

// Attach subcomponents using type-safe composition
const CardNamespace = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter
});

export default CardNamespace;