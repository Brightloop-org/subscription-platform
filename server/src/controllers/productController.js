// Placeholder controller for product endpoints (to be expanded by catalog team)
export const getProducts = async (req, res) => {
  res.status(200).json({ success: true, message: 'Products placeholder' });
};

export const createProduct = async (req, res) => {
  res.status(201).json({ success: true, message: 'Create product placeholder' });
};

export const updateProduct = async (req, res) => {
  res.status(200).json({ success: true, message: 'Update product placeholder' });
};

export const deleteProduct = async (req, res) => {
  res.status(200).json({ success: true, message: 'Delete product placeholder' });
};

