<?php

namespace App\Http\Controllers;

use App\Http\Traits\JsonResponseTrait;
use App\Models\Customer;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    use JsonResponseTrait;

    public function cpListCustomers()
    {
        try {
            $mCustomerList = Customer::all();
            if ($mCustomerList) {
                return $this->cpResponseWithResults($mCustomerList, "Customers listed successfully");
            }
            return $this->cpResponse();
        } catch (QueryException $ex) {
            return $this->cpFailureResponse(500, $ex->getMessage());
        }
    }

    public function cpAddCustomer(Request $request)
    {
        $mValidate = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'email' => 'required|email',
            'phone' => 'required|string'
        ]);
        if ($mValidate->fails()) {
            return $this->cpFailureResponse(422, $mValidate->errors());
        }
        try {
            $mCustomer = Customer::create($request->input());
            if ($mCustomer) {
                return $this->cpResponseWithResults($mCustomer, "Customer created successfully");
            } else
                return $this->cpFailureResponse(500, "Could not create customer.");
        } catch (QueryException $ex) {
            return $this->cpFailureResponse(500, $ex->getMessage());
        }
    }
}
