import React, { useState, useEffect } from 'react';
import { DataTableDemo } from '../components/DataTableDemo';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, X, Upload, Trash2, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { post, get } from '@/utils/Axios';
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const AdminDashboard = () => {




  
   const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
  
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  
  


  // Default state values
  const defaultAttributes = [
    {
      name: "Brand",
      values: ["Samsung", "Apple", "Sony", "LG"]
    },
    {
      name: "Warranty",
      values: ["1 Year", "2 Years", "3 Years"]
    }
  ];
  
  const defaultData = {
    name: "Electronics",
    description: "All kinds of electronic devices",
    image_url: "",
    attributes: defaultAttributes
  };

  const defaultPreviewImage = "https://blinkit.com/images/category/electronics-164.png";

  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultPreviewImage);
  const [attributes, setAttributes] = useState(defaultAttributes);
  const [data, setData] = useState(defaultData);
  const [categories, setCategories] = useState([]);
  const [tableData,setTableData] = useState([])
console.log(tableData,'fddddd');





  const [newAttributeValues, setNewAttributeValues] = useState({});
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get("/api/category/get-category");
        if (response?.status === 200 && response?.data) {
          setCategories(response?.data?.categories || []);
          setTableData(response?.data?.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setPreviewImage(imageUrl);
      setData({ ...data, image_url: imageUrl });
    }
  };

  const addAttribute = () => {
    const newAttributes = [...attributes, { name: "", values: [] }];
    setAttributes(newAttributes);
    setData({...data, attributes: newAttributes});
  };

  const removeAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
    setData({...data, attributes: newAttributes});
  };

  const updateAttributeName = (index, name) => {
    const newAttributes = [...attributes];
    newAttributes[index].name = name;
    setAttributes(newAttributes);
    setData({...data, attributes: newAttributes});
  };

  const addAttributeValue = (attrIndex) => {
    if (newAttributeValues[attrIndex] && newAttributeValues[attrIndex].trim()) {
      const newAttributes = [...attributes];
      newAttributes[attrIndex].values.push(newAttributeValues[attrIndex]);
      setAttributes(newAttributes);
      setData({...data, attributes: newAttributes});
      
      // Clear the input
      setNewAttributeValues({
        ...newAttributeValues,
        [attrIndex]: ""
      });
    }
  };

  const removeAttributeValue = (attrIndex, valueIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].values.splice(valueIndex, 1);
    setAttributes(newAttributes);
    setData({...data, attributes: newAttributes});
  };

  const handleNewAttributeValueChange = (attrIndex, value) => {
    setNewAttributeValues({
      ...newAttributeValues,
      [attrIndex]: value
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});
  };

  // Reset all states to default values
  const resetForm = () => {
    setPreviewImage(defaultPreviewImage);
    setAttributes([...defaultAttributes]);
    setData({...defaultData});
    setNewAttributeValues({});
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/api/category/create-category", data);

      if (response?.status === 200) {
        toast.success(response?.data?.message || "Category added successfully!");
        resetForm(); // Reset form data on successful submission
        closeModal(); // Close modal after resetting
      }
    }
    catch(error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  // Handler for opening modal - ensures fresh state
  const openModal = () => {
    resetForm(); // Reset form when opening modal to ensure no stale data
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-500">Blinkit Admin</h1>
        <Button 
          onClick={openModal}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Add Category
        </Button>
      </div>
      
      <DataTableDemo  data={tableData} columns={columns} />

      <Modal 
        isOpen={isOpen} 
        onClose={closeModal} 
        title="Add Category" 
        size="xl" 
        animation="slide-up"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Details</TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Category Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={data.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Groceries, Electronics, Fashion"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={data.description}
                      onChange={handleInputChange}
                      placeholder="Describe this category"
                      className="mt-1 h-24"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium block mb-2">
                    Category Image
                  </Label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                      {previewImage ? (
                        <>
                          <img
                            src={previewImage}
                            alt="Category"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              setData({...data, image_url: ""});
                            }}
                            className="absolute top-1 right-1 bg-white dark:bg-gray-700 rounded-full p-1 shadow"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full">
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        Recommended: PNG, JPG (300×300px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attributes" className="space-y-4 pt-4">
              <div className="space-y-4">
                {attributes.map((attr, attrIndex) => (
                  <div 
                    key={attrIndex} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Input
                        value={attr.name}
                        onChange={(e) => updateAttributeName(attrIndex, e.target.value)}
                        placeholder="Attribute Name (e.g. Size, Color)"
                        className="max-w-xs"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttribute(attrIndex)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {attr.values.map((value, valueIndex) => (
                        <Badge 
                          key={valueIndex} 
                          variant="secondary"
                          className="flex items-center gap-1 px-2 py-1"
                        >
                          {value}
                          <button
                            type="button"
                            onClick={() => removeAttributeValue(attrIndex, valueIndex)}
                            className="text-gray-500 hover:text-red-500 focus:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add new value"
                        value={newAttributeValues[attrIndex] || ""}
                        onChange={(e) => handleNewAttributeValueChange(attrIndex, e.target.value)}
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addAttributeValue(attrIndex);
                          }
                        }}
                      />
                      <Button 
                        type="button"
                        onClick={() => addAttributeValue(attrIndex)}
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addAttribute}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Attribute
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              type="button"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Save Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;