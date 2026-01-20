'use client'
import CountrySelectField from '@/components/forms/CountrySelectField'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/inputField'
import SelectField from '@/components/forms/SelectField'
import { Button } from '@/components/ui/button'
import { signUpWithEmail } from '@/lib/actions/auth.actions'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const SignOut = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        formState:{errors, isSubmitting},

    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: "Medium",
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
        
    })

    const onSubmit = async(data: SignUpFormData) => {
        try{
            const result = await signUpWithEmail(data);
            if(result.success) router.push('/')
        } catch(e) {
            console.error(e);
            toast.error('Sign-up failed', {
                description: e instanceof Error ? e.message : 'Failed to create an account'
            })
        }
    }
  return (
    <>
        <h1 className='form-title'>Sign Up & Personalize</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

            <InputField
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                register={register}
                error={errors.fullName}
                validation={{required: 'Full name is required', minLength: 2}}
            />
            <InputField
                name="email"
                label="Email"
                placeholder="contact@somistudios.com"
                register={register}
                error={errors.email}
                validation={{required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, mesaage:"Email adress is equired"}}
            />
            <CountrySelectField
             name="countrySelect"
             label="Country"
             control={control}
             error={errors.country}
             required
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

            {/*country*/}

            <SelectField
                name="investmentGoals"
                label="Investment Goals"
                placeholder="Select your invesment goals"
                options={INVESTMENT_GOALS}
                control={control}
                error={errors.investmentGoals}
                required
            />
            <SelectField
                name="riskTolaerance"
                label="Risk Tolerance"
                placeholder="Select your risk level"
                options={RISK_TOLERANCE_OPTIONS}
                control={control}
                error={errors.riskTolerance}
                required
            />
            <SelectField
                name="preferredIndustry"
                label="Preferred Industry"
                placeholder="Select your Preferred Industry"
                options={PREFERRED_INDUSTRIES}
                control={control}
                error={errors.preferredIndustry}
                required
            />

            <Button type="submit" disabled={isSubmitting} className='yellow-btn w-full mt-5'>
                {isSubmitting ? 'Creating Account': 'Start Your Investing Journey'}
            </Button>

            <FooterLink text="Already have an account" linkText='Sign in' href="/sign-in" />
        </form>
    </>
  )
}

export default SignOut