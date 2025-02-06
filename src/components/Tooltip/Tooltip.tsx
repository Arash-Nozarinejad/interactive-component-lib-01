import React, { useState, useRef, useCallback, useEffect } from 'react';

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Tooltip placement */
  placement?: TooltipPlacement;
  /** Delay (ms) before showing the tooltip */
  showDelay?: number;
  /** Delay (ms) before hiding the tooltip */
  hideDelay?: number;
  /** Disable the tooltip */
  disabled?: boolean;
  /** Show an arrow */
  arrow?: boolean;
  /** Maximum width of the tooltip */
  maxWidth?: number;
  /** Show tooltip on focus */
  showOnFocus?: boolean;
  /** Control tooltip externally */
  controlled?: boolean;
  /** Visibility flag for controlled mode */
  visible?: boolean;
  /** Callback for visibility changes (controlled mode) */
  onVisibleChange?: (visible: boolean) => void;
  /** Offset from the trigger element (px) */
  offset?: number;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  showDelay = 200,
  hideDelay = 150,
  disabled = false,
  arrow = true,
  maxWidth = 250,
  showOnFocus = true,
  controlled = false,
  visible: controlledVisible,
  onVisibleChange,
  offset = 8,
  className,
  ...props
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<number>();
  const hideTimeoutRef = useRef<number>();

  // Generate a stable tooltip id only once.
  const tooltipIdRef = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

  const isVisible = controlled ? controlledVisible : visible;

  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      window.clearTimeout(showTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
    }
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - offset;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + offset;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + offset;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - offset;
        break;
    }

    setPosition({ top, left });
  }, [placement, offset]);

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeouts();
    showTimeoutRef.current = window.setTimeout(() => {
      if (controlled) {
        onVisibleChange?.(true);
      } else {
        setVisible(true);
      }
    }, showDelay);
  }, [disabled, showDelay, controlled, onVisibleChange, clearTimeouts]);

  const hide = useCallback(() => {
    clearTimeouts();
    hideTimeoutRef.current = window.setTimeout(() => {
      if (controlled) {
        onVisibleChange?.(false);
      } else {
        setVisible(false);
      }
    }, hideDelay);
  }, [hideDelay, controlled, onVisibleChange, clearTimeouts]);

  // Update tooltip position when visible or when content changes.
  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const handleScrollResize = () => updatePosition();
      window.addEventListener('scroll', handleScrollResize);
      window.addEventListener('resize', handleScrollResize);
      return () => {
        window.removeEventListener('scroll', handleScrollResize);
        window.removeEventListener('resize', handleScrollResize);
      };
    }
  }, [isVisible, content, updatePosition]);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Clone the trigger element to attach event handlers.
  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: showOnFocus ? show : undefined,
    onBlur: showOnFocus ? hide : undefined,
    'aria-describedby': isVisible ? tooltipIdRef.current : undefined,
  });

  return (
    <>
      {trigger}
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          id={tooltipIdRef.current}
          className={[
            'fixed z-50 rounded-md bg-gray-900 px-2 py-1 text-sm text-white shadow-lg',
            'animate-in fade-in duration-200',
            className
          ].filter(Boolean).join(' ')}
          style={{
            top: position.top,
            left: position.left,
            maxWidth,
            pointerEvents: 'none'
          }}
          {...props}
        >
          {content}
          {arrow && (
            <div
              className={[
                'absolute h-2 w-2 rotate-45 bg-gray-900',
                placement === 'top' ? 'bottom-[-4px]' : '',
                placement === 'right' ? 'left-[-4px]' : '',
                placement === 'bottom' ? 'top-[-4px]' : '',
                placement === 'left' ? 'right-[-4px]' : ''
              ].filter(Boolean).join(' ')}
              style={{
                left: (placement === 'top' || placement === 'bottom') ? '50%' : undefined,
                top: (placement === 'left' || placement === 'right') ? '50%' : undefined,
                transform: `translate${(placement === 'top' || placement === 'bottom') ? 'X' : 'Y'}(-50%) rotate(45deg)`
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
