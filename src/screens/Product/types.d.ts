export type ProductDataProps = {
  id: number;
  key: number;
  name: string;
  description: string;
  categoryname: string;
  unit: string;
  quantity: string;
  image_url: string;
};

export type ProductFormProps = {
  data: ProductDataProps[];
  formStatus: 'CREATE' | 'EDIT';
  initialValue?: ProductDataProps | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<ProductDataProps[]>>;
  notify: ({ message, desp }: { message: string; desp: string }) => void;
};
