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

    public function cpUpdateCustomer(Request $request)
    {
        $mValidate = Validator::make($request->all(), [
            'id' => 'required|integer',
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'email' => 'required|email',
            'phone' => 'required|string'
        ]);
        if ($mValidate->fails()) {
            return $this->cpFailureResponse(422, $mValidate->errors());
        }
        try {
            $mCustomer = Customer::where('id', $request['id'])->first();
            $isUpdated = $mCustomer->update([
                'first_name' => $request['first_name'],
                'last_name' => $request['last_name'],
                'email' => $request['email'],
                'phone' => $request['phone']
            ]);
            if ($isUpdated) {
                $mCustomerUpdated = $mCustomer->refresh();
                return $this->cpResponseWithResults($mCustomerUpdated, "Customer updated successfully");
            } else {
                return $this->cpFailureResponse(500, "Customer could not be updated");
            }
        } catch (QueryException $ex) {
            return $this->cpFailureResponse(500, $ex->getMessage());
        }
    }

    public function cpDeleteCustomer(Request $request)
    {
        $mValidate = Validator::make($request->all(), [
            'id' => 'required|integer'
        ]);
        if ($mValidate->fails()) {
            return $this->cpFailureResponse(422, $mValidate->errors());
        }
        try {
            $mDeleted = Customer::where('id', $request['id'])->delete($request->input());
            if ($mDeleted) {
                return $this->cpResponseWithResults($mDeleted, "Customer deleted successfully");
            } else
                return $this->cpFailureResponse(500, "Could not delete customer.");
        } catch (QueryException $ex) {
            return $this->cpFailureResponse(500, $ex->getMessage());
        }
    }
}
