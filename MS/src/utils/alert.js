import Swal from "sweetalert2";

export const successAlert = (title) => {
  return Swal.fire({
    icon: "success",
    title,
    timer: 1800,
    showConfirmButton: false,
  });
};

export const errorAlert = (title) => {
  return Swal.fire({
    icon: "error",
    title,
  });
};

export const warningAlert = (title) => {
  return Swal.fire({
    icon: "warning",
    title,
  });
};

export const confirmDelete = () => {
  return Swal.fire({
    title: "Hapus transaksi?",
    text: "Data yang dihapus tidak dapat dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });
};