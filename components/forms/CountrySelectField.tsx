import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useMemo, useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import countryList from 'react-select-country-list'
import { cn } from '@/lib/utils'
import { ChevronsUpDown } from 'lucide-react'
import { Controller } from 'react-hook-form'

const CountrySelectField = ({name, label, control, required, error}: CountrySelectProps) => {
    const options = useMemo(() => countryList().getData(), [])
    const [value, setValue] = useState("");
    
    const getFlagEmoji = (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };
    return (
    <div className='space-y-2'>

        <Label className='form-label'>{label}</Label>
                <Popover>
                    <PopoverTrigger className={cn(
                            "border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full h-12 text-base",
                            
                          )}>
                           <div className='flex gap-2'>
                              <span>
                                {(() => {
    
                              const selectedOption = options.find(opt => opt.label === value);
                              return selectedOption ? getFlagEmoji(selectedOption.value) : getFlagEmoji("US");
                              })()}
                              </span>
                              <p>{value == "" ? "United States" : value}</p>
                            </div>
                              <ChevronsUpDown className="size-4 opacity-50 ml-auto"/>
                           
                            
                        
                    </PopoverTrigger>
                    <PopoverContent className='w-full bg-gray-800'>
                        <Command value={value} className='bg-gray-800'>
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            {options.map((option)=>(
                                <CommandItem key={option.label} onSelect={()=> setValue(option.label)}>
                                  <span>{option.value ? getFlagEmoji(option.value): ""}</span>
                                  <span>{option?.label}</span>
                                    
                                </CommandItem>
                            ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

    </div>
  )
}

// export const CountrySelectField = ({name,label,control,error, required=false}:CountrySelectProps) => {
//   return(
//     <div className='space-y-2'>
//       <Label>
//         {label}
//       </Label>
//       <Controller
//         name={name}
//         control={control}
//         rules={{required:required ? `Please select ${label.toLowerCase()}`:false,}}
//         render={({field})=>(
//           <CountrySelect value={field.value} onChange={field.onChange}/>
//         )}
//       />
//       {error && <p className='text-sm text-red-500'>{error.message}</p>}
//         <p className='text-xs text-gray-500'>
//           Helps us show market data and news relevant to you
//         </p>
//     </div>
//   )
// }

export default CountrySelectField