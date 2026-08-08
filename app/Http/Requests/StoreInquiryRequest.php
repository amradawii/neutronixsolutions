<?php

namespace App\Http\Requests;

use App\Models\Inquiry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->input('name')),
            'email' => trim((string) $this->input('email')),
            'phone' => $this->filled('phone') ? trim((string) $this->input('phone')) : null,
            'company' => $this->filled('company') ? trim((string) $this->input('company')) : null,
            'message' => trim((string) $this->input('message')),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:100', 'regex:/^[\p{L}\s]+$/u'],
            'email' => ['required', 'email:rfc', 'max:255', 'regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/'],
            'phone' => ['nullable', 'string', 'min:7', 'max:20', 'regex:/^\+?[0-9]+$/'],
            'company' => ['nullable', 'string', 'max:120'],
            'service' => ['required', Rule::in(Inquiry::SERVICES)],
            'message' => ['required', 'string', 'min:20', 'max:3000'],
            'website' => ['nullable', 'max:0'],
        ];
    }

    public function messages(): array
    {
        if (app()->isLocale('ar')) {
            return [
                'name.required' => 'يرجى إدخال الاسم.',
                'name.min' => 'يجب ألا يقل الاسم عن حرفين.',
                'name.max' => 'يجب ألا يتجاوز الاسم 100 حرف.',
                'email.required' => 'يرجى إدخال البريد الإلكتروني للعمل.',
                'email.email' => 'يرجى إدخال بريد إلكتروني صحيح.',
                'email.max' => 'يجب ألا يتجاوز البريد الإلكتروني 255 حرفاً.',
                'phone.min' => 'يرجى إدخال رقم هاتف صحيح.',
                'phone.max' => 'يجب ألا يتجاوز رقم الهاتف 30 حرفاً.',
                'phone.regex' => 'يرجى إدخال رقم هاتف صحيح.',
                'company.max' => 'يجب ألا يتجاوز اسم الشركة 120 حرفاً.',
                'service.required' => 'يرجى اختيار الخدمة المطلوبة.',
                'service.in' => 'الخدمة المختارة غير صالحة.',
                'message.required' => 'يرجى وصف التحدي أو نطاق المشروع.',
                'message.min' => 'يرجى إضافة تفاصيل أكثر، بما لا يقل عن 20 حرفاً.',
                'message.max' => 'يجب ألا تتجاوز تفاصيل المشروع 3000 حرف.',
                'website.max' => 'تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.',
            ];
        }

        return [
            'name.required' => 'Please enter your name.',
            'name.min' => 'Your name must be at least 2 characters.',
            'name.max' => 'Your name must not exceed 100 characters.',
            'email.required' => 'Please enter your business email.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Your email must not exceed 255 characters.',
            'phone.min' => 'Please enter a valid phone number.',
            'phone.max' => 'Your phone number must not exceed 30 characters.',
            'phone.regex' => 'Please enter a valid phone number.',
            'company.max' => 'Your company name must not exceed 120 characters.',
            'service.required' => 'Please choose the service you need.',
            'service.in' => 'The selected service is invalid.',
            'message.required' => 'Please describe your challenge or project scope.',
            'message.min' => 'Please add a little more detail, using at least 20 characters.',
            'message.max' => 'Your project details must not exceed 3000 characters.',
            'website.max' => 'We could not submit this request. Please try again.',
        ];
    }
}
