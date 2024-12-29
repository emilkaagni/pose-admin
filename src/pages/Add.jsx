import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const categories = {
    Men: ["Topwear", "Bottomwear", "Outerwear"],
    Women: ["Dresses", "Blouses", "Outerwear"],
    Kids: ["Shirts", "Pants", "Jackets"],
  };

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const onSizeToggle = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Add Product</h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full mt-1 p-2 border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Product Category and Subcategory */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory(categories[e.target.value][0]);
                }}
                className="w-full mt-1 p-2 border rounded-md"
                required
              >
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
                required
              >
                {categories[category]?.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (रू)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sizes</label>
            <div className="flex gap-2 mt-2">
              {sizeOptions.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => onSizeToggle(size)}
                  className={`px-4 py-2 border rounded-md ${sizes.includes(size) ? "bg-gray-700 text-white" : "bg-gray-200"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={bestseller}
              onChange={() => setBestseller(!bestseller)}
            />
            <label className="text-sm font-medium text-gray-700">Add to Bestseller</label>
          </div>

          <div className="flex gap-4">
            {/* Image 1 */}
            <div className="relative">
              <label htmlFor="image1">
                <img
                  className="w-20 h-20 border-2 border-gray-300 rounded-md object-cover cursor-pointer hover:border-blue-500 transition"
                  src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                  alt="Upload"
                />
              </label>
              <input
                type="file"
                id="image1"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </div>

            {/* Image 2 */}
            <div className="relative">
              <label htmlFor="image2">
                <img
                  className="w-20 h-20 border-2 border-gray-300 rounded-md object-cover cursor-pointer hover:border-blue-500 transition"
                  src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                  alt="Upload"
                />
              </label>
              <input
                type="file"
                id="image2"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </div>

            {/* Image 3 */}
            <div className="relative">
              <label htmlFor="image3">
                <img className="w-20 h-20 border-2 border-gray-300 rounded-md object-cover cursor-pointer hover:border-blue-500 transition" src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="Upload" />
              </label>
              <input type="file" id="image3" className="hidden" accept="image/*" onChange={(e) => setImage3(e.target.files[0])} />
            </div>

            {/* Image 4 */}
            <div className="relative">
              <label htmlFor="image4">
                <img className="w-20 h-20 border-2 border-gray-300 rounded-md object-cover cursor-pointer hover:border-blue-500 transition" src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="Upload" />
              </label>
              <input type="file" id="image4" className="hidden" accept="image/*" onChange={(e) => setImage4(e.target.files[0])} />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add