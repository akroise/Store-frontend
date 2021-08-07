import toast from "react-hot-toast";

// Function to Copy text from Input Field
const copyLink = (inp_id) => {
  let inp = document.getElementById(inp_id);
  inp.disabled = false;
  inp.select();
  inp.setSelectionRange(0, 9999);
  document.execCommand("copy");

  inp.setSelectionRange(0, 0);
  inp.disabled = true;
  inp.blur();
  toast.success(<span>&ensp;Link Copied</span>);
};

// Function to Captialize
const capitalize = (string) => {
  //
  // Replace underscores from table headers
  string = string.replace(/_/g, " ");

  //   Return after Capitalizing
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (c) => c.toUpperCase());
};

export { capitalize, copyLink };
