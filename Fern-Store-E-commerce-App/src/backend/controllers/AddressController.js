import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * This handler handles getting items to user's wishlist.
 * send GET Request at /api/user/address
 * */

 export const getAddresslistHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userAddress = schema.users.findBy({ _id: userId }).address;
    return new Response(200, {}, { wishlist: userAddress });
  };

  
/**
 * This handler handles adding items to user's wishlist.
 * send POST Request at /api/user/address
 * body contains {product}
 * */

export const addAddressToAddresslistHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
      if (!userId) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const userAddresslist = schema.users.findBy({ _id: userId }).address;
      const { address } = JSON.parse(request.requestBody);
      userAddresslist.push({
        ...address,
        createdAt: formatDate(),
        updatedAt: formatDate(),
      });
      this.db.users.update({ _id: userId }, { address: userAddresslist });
      return new Response(201, {}, { address: userAddresslist });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };

  /**
 * This handler handles removing items to user's wishlist.
 * send DELETE Request at /api/user/address/:addressId
 * body contains {product}
 * */

export const removeAddressFromAddresslistHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
      if (!userId) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      let userAddress = schema.users.findBy({ _id: userId }).address;
      const addressId = request.params.addressId;
      userAddress = userAddress.filter((item) => item.id !== addressId);
      this.db.users.update({ _id: userId }, { address: userAddress });
      return new Response(200, {}, { address: userAddress });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };

  
/**
 * This handler handles updating a note
 * send POST Request at /api/user/address/:addressId
 * body contains {note}
 * */

export const updateAddressHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
      if (!userId) {
        return new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const { address } = JSON.parse(request.requestBody);
      const { addressId } = request.params;
      let addresslist = schema.users.findBy({ _id: userId }).address;
      const addressIndex = addresslist.findIndex((address) => address.id === addressId);
      addresslist[addressIndex] = { ...address };
      this.db.users.update({ _id: userId }, {address: addresslist});
      return new Response(201, {}, { address: addresslist });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };