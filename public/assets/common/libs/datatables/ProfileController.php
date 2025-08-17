<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Devices;
use App\Models\Orders;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Models\Notification;
use CommonHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller {
    use ApiResponser;

    public function profile_view_edit(Request $request) {
        CommonHelper::checkBarear($request->user_id);
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
            'profile_picture' => 'image|mimes:jpeg,png,jpg,heic|max:5120',
            'first_name' => 'min:2|max:15',
            'last_name' => 'min:2|max:15',
            'class' => 'min:1|max:15',
            'phone' => 'min:10|max:11|unique:users,phone,' . $request->user_id,
        ], [
            'profile_picture.image' => 'Accepted file formats: jpg, jpeg, png,heic',
            'profile_picture.max' => 'Maximum file size should be 5 MB',
            'phone.unique' => 'The phone number has been already taken',
        ]);
        if (!$validator->fails()) {
            $user = User::where('id', $request->user_id)->first();
            if (isset($user)) {
                if (in_array($user->hasRole(), [3, 4, 5, 6])) {
                    if ($request->hasFile('profile_picture')) {
                        $dir = env('AWS_S3_MODE')."/users";
                        $profile_picture = CommonHelper::s3Upload($request->file('profile_picture'), $dir);
                        $update_data['profile_picture'] = $profile_picture;
                    }
                    if (isset($request->first_name) && $request->first_name != '') {
                        $update_data['first_name'] = $request->first_name;
                    }
                    if (isset($request->last_name) && $request->last_name != '') {
                        $update_data['last_name'] = $request->last_name;
                    }
                    if (isset($request->gender) && $request->gender != '') {
                        $update_data['gender'] = $request->gender;
                    }
                    if (isset($request->phone) && $request->phone != '') {
                        $update_data['phone'] = $request->phone;
                    }
                    if (isset($request->dob) && $request->dob != '') {
                        $update_data['dob'] = $request->dob;
                    }
                    if (isset($request->school) && $request->school != '') {
                        $update_data['school'] = $request->school;
                    }
                    if (isset($request->grade) && $request->grade != '') {
                        $update_data['grade'] = $request->grade;
                    }
                    if (isset($request->class) && $request->class != '') {
                        $update_data['class'] = $request->class;
                    }
                    if (isset($request->school_id_number) && $request->school_id_number != '') {
                        $update_data['school_id_number'] = $request->school_id_number;
                    }

                    if (isset($update_data) && !empty($update_data)) {
                        User::whereId($request->user_id)->update($update_data);
                        $user = User::where('id', $request->user_id)->first();
                        $accessToken = $user->createToken('authToken')->accessToken;
                        $user->token = $accessToken;
                    }
                    return $this->successResponse($user, __('Profile Updated Successfully'));
                } else {
                    return $this->errorResponse(__('User not found'));
                }
            } else {
                return $this->errorResponse(__('User not found'));
            }
        }
        return $this->errorResponse($validator->messages(), true);
    }

    public function change_password(Request $request) {
        CommonHelper::checkBarear($request->user_id);
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
            'password' => 'required',
        ]);
        if (!$validator->fails()) {
            $user = User::where('id', $request->user_id)->first();
            if (isset($user)) {
                if (in_array($user->hasRole(), [3, 4, 5, 6])) {

                    $update_data['password'] = Hash::make($request->password);
                    User::whereId($request->user_id)->update($update_data);
                    return $this->successResponse($user, __('Password Changed Successfully'));
                } else {
                    return $this->errorResponse(__('User not found'));
                }
            } else {
                return $this->errorResponse(__('User not found'));
            }
        }
        return $this->errorResponse($validator->messages(), true);
    }

    public function children_list(Request $request) {
        CommonHelper::checkBarear($request->user_id);
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',

        ]);
        if (!$validator->fails()) {
            $childrens = User::where('parent_id', $request->user_id)->where('status', 1)->get();

            if (count($childrens) > 0) {
                $i = 0;
                foreach ($childrens as $value) {
                    $orders = Orders::whereCustomerId($value->id)->whereStatus(1)->first();
                    $childrens[$i]->delete = 1;
                    if (!empty($orders)) {
                        $childrens[$i]->delete = 0;
                    }
                    $i++;
                }
                return $this->successResponse($childrens, __('List of Childrens'));
            } else {
                return $this->errorResponse(__('Children not found'));
            }
        }
        return $this->errorResponse($validator->messages(), true);
    }

    public function delete_children(Request $request) {
        CommonHelper::checkBarear($request->user_id);
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
        ]);
        if (!$validator->fails()) {
            $children = User::where('id', $request->user_id)->where('parent_id', '!=', 0)->first();
            if (isset($children)) {
                User::where('id', $request->user_id)->where('parent_id', '!=', 0)->delete();
                return $this->successResponse([], __('Children Deleted Successfully'));
            } else {
                return $this->errorResponse(__('Children not found'));
            }
        }
        return $this->errorResponse($validator->messages(), true);
    }

    public function logout(Request $request) {
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
        ]);
        if (!$validator->fails()) {
            $user = User::where('id', $request->user_id)->first();
            // echo "<pre>";
            // print_r($user->findForPassport($request->user_id));exit;
            if (isset($user)) {
                $devices = Devices::where('user_id', $request->user_id)->update([
                    'name' => '',
                    'token' => '',
                    'type' => '',
                ]);
                // echo "<pre>";
                $user->tokens->each(function ($token, $key) {
                    // print_r($token);
                    // $token->delete();
                });
                // exit;
                return $this->successResponse([], __('Log Out Successfully'));
            } else {
                return $this->errorResponse(__('User not found'));
            }
        }
        return $this->errorResponse($validator->messages(), true);
    }

    public function notifications(Request $request) {
        CommonHelper::checkBarear($request->user_id);
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
        ]);
        if (!$validator->fails()) {

            $notifications = Notification::whereUserId($request->user_id)->orderBy('id','desc')->get()->toArray();
            if(empty($notifications))
            {
                return $this->errorResponse(__('No notifications found'));    
            }
            return $this->successResponse($notifications, __(''));
        } else {
            return $this->errorResponse(__('User not found'));
        }
    }

    public function notifications_delete(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
        ]);
        if (!$validator->fails()) {
            Notification::whereUserId($request->user_id)->delete();
            return $this->successResponse([], __('Notifications deleted successfully'));
        }
        else {
            return $this->errorResponse(__('User not found'));
        }
    }

}
