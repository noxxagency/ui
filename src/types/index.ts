import * as React from "react"

// Base HTML attributes that all components can receive
export interface BaseComponentProps {
  className?: string
  id?: string
  style?: React.CSSProperties
  "data-testid"?: string
  [key: string]: any
}

// Accordion types
export interface AccordionProps extends BaseComponentProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  dir?: "ltr" | "rtl"
  orientation?: "horizontal" | "vertical"
}

export interface AccordionItemProps extends BaseComponentProps {
  value: string
  disabled?: boolean
}

export interface AccordionTriggerProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AccordionContentProps extends BaseComponentProps {
  children?: React.ReactNode
}

// Alert Dialog types
export interface AlertDialogProps extends BaseComponentProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
}

export interface AlertDialogTriggerProps extends BaseComponentProps {
  asChild?: boolean
  children?: React.ReactNode
}

export interface AlertDialogPortalProps extends BaseComponentProps {
  children?: React.ReactNode
  container?: HTMLElement | null
  forceMount?: true
}

export interface AlertDialogOverlayProps extends BaseComponentProps {}

export interface AlertDialogContentProps extends BaseComponentProps {
  children?: React.ReactNode
  forceMount?: true
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: CustomEvent) => void
  onInteractOutside?: (event: CustomEvent) => void
}

export interface AlertDialogHeaderProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AlertDialogFooterProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AlertDialogTitleProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AlertDialogDescriptionProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AlertDialogActionProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AlertDialogCancelProps extends BaseComponentProps {
  children?: React.ReactNode
}

// Alert types
export interface AlertProps extends BaseComponentProps {
  variant?: "default" | "destructive"
  children?: React.ReactNode
}

export interface AlertTitleProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AlertDescriptionProps extends BaseComponentProps {
  children?: React.ReactNode
}

// Avatar types
export interface AvatarProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface AvatarImageProps extends BaseComponentProps {
  src?: string
  alt?: string
  onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void
}

export interface AvatarFallbackProps extends BaseComponentProps {
  children?: React.ReactNode
  delayMs?: number
}

// Breadcrumb types
export interface BreadcrumbProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface BreadcrumbListProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface BreadcrumbItemProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface BreadcrumbLinkProps extends BaseComponentProps {
  asChild?: boolean
  href?: string
  children?: React.ReactNode
}

export interface BreadcrumbPageProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface BreadcrumbSeparatorProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface BreadcrumbEllipsisProps extends BaseComponentProps {}

// Calendar types
export interface CalendarProps extends BaseComponentProps {
  showOutsideDays?: boolean
  classNames?: Record<string, string>
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | { from: Date; to?: Date }
  onSelect?: (date: Date | Date[] | { from: Date; to?: Date } | undefined) => void
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (date: Date) => void
  disabled?: boolean | ((date: Date) => boolean)
  fromDate?: Date
  toDate?: Date
  fromYear?: number
  toYear?: number
  fromMonth?: Date
  toMonth?: Date
  numberOfMonths?: number
  [key: string]: any
}

// Carousel types - Using any to match Embla's actual type
export type CarouselApi = any

export interface CarouselContextProps {
  carouselRef: (node: HTMLElement | null) => void
  api: CarouselApi | null
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation?: "horizontal" | "vertical"
  opts?: Record<string, any>
}

export interface CarouselProps extends BaseComponentProps {
  orientation?: "horizontal" | "vertical"
  opts?: Record<string, any>
  setApi?: (api: CarouselApi) => void
  plugins?: any[]
  children?: React.ReactNode
}

export interface CarouselContentProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CarouselItemProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CarouselButtonProps extends BaseComponentProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

// Button types
export interface ButtonProps extends BaseComponentProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  children?: React.ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// Input types
export interface InputProps extends BaseComponentProps {
  type?: string
  value?: string | number
  defaultValue?: string | number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  autoComplete?: string
  autoFocus?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string
  step?: string | number
  min?: string | number
  max?: string | number
}

// Label types
export interface LabelProps extends BaseComponentProps {
  htmlFor?: string
  children?: React.ReactNode
}

// Checkbox types
export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
}

// Switch types
export interface SwitchProps extends BaseComponentProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
}

// Textarea types
export interface TextareaProps extends BaseComponentProps {
  value?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  rows?: number
  cols?: number
  maxLength?: number
  minLength?: number
  autoFocus?: boolean
}

// Card types
export interface CardProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CardHeaderProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CardTitleProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CardDescriptionProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CardContentProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CardFooterProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface CardActionProps extends BaseComponentProps {
  children?: React.ReactNode
}

// Dialog types
export interface DialogProps extends BaseComponentProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
}

export interface DialogTriggerProps extends BaseComponentProps {
  asChild?: boolean
  children?: React.ReactNode
}

export interface DialogPortalProps extends BaseComponentProps {
  children?: React.ReactNode
  container?: HTMLElement | null
  forceMount?: boolean
}

export interface DialogOverlayProps extends BaseComponentProps {}

export interface DialogContentProps extends BaseComponentProps {
  children?: React.ReactNode
  forceMount?: boolean
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: CustomEvent) => void
  onInteractOutside?: (event: CustomEvent) => void
}

export interface DialogHeaderProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface DialogFooterProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface DialogTitleProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface DialogDescriptionProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface DialogCloseProps extends BaseComponentProps {
  asChild?: boolean
  children?: React.ReactNode
}

// Select types
export interface SelectProps extends BaseComponentProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  required?: boolean
  dir?: "ltr" | "rtl"
}

export interface SelectTriggerProps extends BaseComponentProps {
  children?: React.ReactNode
  size?: "default" | "sm" | "lg"
}

export interface SelectContentProps extends BaseComponentProps {
  children?: React.ReactNode
  position?: "item-aligned" | "popper"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}

export interface SelectItemProps extends BaseComponentProps {
  value: string
  children?: React.ReactNode
  disabled?: boolean
}

export interface SelectLabelProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface SelectSeparatorProps extends BaseComponentProps {}

export interface SelectGroupProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface SelectValueProps extends BaseComponentProps {
  placeholder?: string
}

// Table types
export interface TableProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TableHeaderProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TableBodyProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TableFooterProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TableRowProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TableHeadProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TableCellProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TableCaptionProps extends BaseComponentProps {
  children?: React.ReactNode
}

// Tabs types
export interface TabsProps extends BaseComponentProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
  dir?: "ltr" | "rtl"
  activationMode?: "automatic" | "manual"
  children?: React.ReactNode
}

export interface TabsListProps extends BaseComponentProps {
  children?: React.ReactNode
}

export interface TabsTriggerProps extends BaseComponentProps {
  value: string
  children?: React.ReactNode
  disabled?: boolean
}

export interface TabsContentProps extends BaseComponentProps {
  value: string
  children?: React.ReactNode
  forceMount?: boolean
}

// Tooltip types
export interface TooltipProps extends BaseComponentProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
  disableHoverableContent?: boolean
  children?: React.ReactNode
}

export interface TooltipTriggerProps extends BaseComponentProps {
  asChild?: boolean
  children?: React.ReactNode
}

export interface TooltipContentProps extends BaseComponentProps {
  children?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  forceMount?: boolean
}

export interface TooltipProviderProps extends BaseComponentProps {
  children?: React.ReactNode
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
}

// Popover types
export interface PopoverProps extends BaseComponentProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
}

export interface PopoverTriggerProps extends BaseComponentProps {
  asChild?: boolean
  children?: React.ReactNode
}

export interface PopoverContentProps extends BaseComponentProps {
  children?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  forceMount?: boolean
}

export interface PopoverAnchorProps extends BaseComponentProps {
  asChild?: boolean
  children?: React.ReactNode
}

// Slider types
export interface SliderProps extends BaseComponentProps {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
  inverted?: boolean
  dir?: "ltr" | "rtl"
  name?: string
}

// Progress types
export interface ProgressProps extends BaseComponentProps {
  value?: number
  max?: number
}

// Skeleton types
export interface SkeletonProps extends BaseComponentProps {}

// Separator types
export interface SeparatorProps extends BaseComponentProps {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

// Badge types
export interface BadgeProps extends BaseComponentProps {
  variant?: "default" | "secondary" | "destructive" | "outline"
  children?: React.ReactNode
}

// Aspect Ratio types
export interface AspectRatioProps extends BaseComponentProps {
  ratio?: number
  children?: React.ReactNode
}

// Collapsible types
export interface CollapsibleProps extends BaseComponentProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  children?: React.ReactNode
}

export interface CollapsibleTriggerProps extends BaseComponentProps {
  asChild?: boolean
  children?: React.ReactNode
}

export interface CollapsibleContentProps extends BaseComponentProps {
  forceMount?: boolean
  children?: React.ReactNode
}
