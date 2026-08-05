<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePasswordRequest;
use App\Http\Requests\Admin\UpdateProfileRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the admin profile page.
     */
    public function show()
    {
        $admin = Auth::guard('admin')->user();

        return Inertia::render('Admin/Profile', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'username' => $admin->username,
                'email' => $admin->email,
                'photo_url' => $admin->photo_url,
            ]
        ]);
    }

    /**
     * Update admin profile info.
     */
    public function updateInfo(UpdateProfileRequest $request)
    {
        $admin = Auth::guard('admin')->user();

        $admin->name = $request->input('name');
        $admin->username = $request->input('username');
        $admin->email = $request->input('email');

        if ($request->hasFile('photo')) {
            // Delete old photo if it exists
            if ($admin->photo) {
                Storage::disk('public')->delete($admin->photo);
            }

            // Save the uploaded avatar image file
            $path = $request->file('photo')->store('admins/' . $admin->id, 'public');
            $admin->photo = $path;
        }

        $admin->save();

        return redirect()->route('admin.profile')
            ->with('success', 'Profile updated successfully.');
    }

    /**
     * Update admin password.
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $admin = Auth::guard('admin')->user();

        if (! Hash::check($request->input('current_password'), $admin->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        $admin->password = Hash::make($request->input('password'));
        $admin->save();

        return redirect()->route('admin.profile')
            ->with('success', 'Password changed successfully.');
    }
}
