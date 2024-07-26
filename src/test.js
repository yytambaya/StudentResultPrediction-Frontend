<div>
    <label for="health" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
    <input value={health} onChange={(e) => setHealth(e.target.value)} type="email" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
    {error.find(item => item.field == "health").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "health").msg }</p>: null}
</div>