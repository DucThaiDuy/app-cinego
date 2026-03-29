# Implementation Plan: Customer Selection Modal for Kiosk Booking

## Status: In Progress [1/8] ✅ Step 1 Complete

### Step 1: Create CustomerSelectModal component ✅ COMPLETE

- ✅ Created `src/components/Booking_Counter/CustomerSelectModal.tsx` + `.scss`
- ✅ Searchable list, fetch users, Vietnamese UI"

### Step 2: Update KioskBooking.tsx - Imports & States

- [ ] Add imports: User type, services, new modal
- [ ] Add states: customers[], selectedCustomer, showCustomerModal, loading

### Step 3: Fetch customers in KioskBooking

- [ ] Add fetchCustomers() using adminUserService.fetchUsers(page=1, limit=50)
- [ ] Load on mount or when modal opens

### Step 4: Update confirmBooking()

- [ ] On button click: validate seats → setShowCustomerModal(true)

### Step 5: Add customer handlers

- [ ] handleSelectCustomer(customer: User)
- [ ] handleFinalizeBooking() - build booking data, adminBookingService.add(), success alert, clear

### Step 6: Add Modal JSX in KioskBooking render

- [ ] Conditional render CustomerSelectModal

### Step 7: Style improvements

- [ ] Basic CSS for modal/search/table
- [ ] Vietnamese labels

### Step 8: Test & Polish

- [ ] Test full flow: seats → confirm → modal → select → booking
- [ ] Handle no customers, loading, errors
- [ ] Mark complete, attempt_completion

**Notes:**

- Guest option? Skip for now (require selection).
- Use existing Confirm styles.
- Mock API if needed.
