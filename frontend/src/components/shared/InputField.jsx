import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

export default function InputField({ heading = "", desc = "" }) {
    return (
        <div className="w-full max-w-md rounded-lg shadow-sm bg-white">
            <Field>
                <Label className="text-sm font-medium text-gray-800">{heading}</Label>
                <Description className="text-sm text-gray-600">{desc}</Description>
                <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm text-gray-800',
                        'focus:outline-none focus:ring-2 focus:ring-red-700 focus:shadow-lg focus:border-red-700 focus:shadow-all transition-all duration-200'
                    )}
                    placeholder='Enter your dream Job..'
                    style={{
                        boxShadow: '0 4px 6px rgba(220, 7, 7, 0.15), 0 -4px 6px rgba(220, 7, 7, 0.075), 4px 0 6px rgba(220, 7, 7, 0.075), -4px 0 6px rgba(220, 7, 7, 0.075)'
                    }}
                />
            </Field>
        </div>
    )
}