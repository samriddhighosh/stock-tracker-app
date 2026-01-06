'use client'
import CountrySelectField from '@/components/forms/CountrySelectField'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/inputField'
import SelectField from '@/components/forms/SelectField'
import { Button } from '@/components/ui/button'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants'
import { useForm } from 'react-hook-form'

const SignIn = () => {
    const {
        register,
        handleSubmit,
        control,
        formState:{errors, isSubmitting},

    } = useForm<SignUpFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
        
    })

    const onSubmit = async(data: SignUpFormData) => {
        try{
            console.log(data);
        } catch(e) {
            console.error(e);
        }
    }
  return (
    <div className='items-center justify-center my-auto'>
        <h1 className='form-title'>Log Into Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <InputField
                name="email"
                label="Email"
                placeholder="contact@somistudios.com"
                register={register}
                error={errors.email}
                validation={{required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, mesaage:"Email adress is equired"}}
            />
            <InputField
                name="password"
                label="Password"
                placeholder="Enter a strong password"
                type="password"
                register={register}
                error={errors.password}
                validation={{required: 'Password is required', minLength: 8}}
            />
            <Button type="submit" disabled={isSubmitting} className='yellow-btn w-full mt-5'>
                {isSubmitting ? 'Logging In': 'Log In'}
            </Button>

            <FooterLink text="Don't have an account?" linkText='Sign Up' href="/sign-up" />
          </form>
    </div>
  )
}

export default SignIn