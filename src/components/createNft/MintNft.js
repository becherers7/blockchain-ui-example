import React, { useState, useContext } from "react";
import LoadingScreen from "../../common/LoadingScreen";
import CreateForm from "./CreateForm";
import { NftContext } from "../../context/nftContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const MintNft = () => {
  const { submitNft, resetFile } = useContext(NftContext);
  const [message, setMessage] = useState(""); //use this with custom error handling from backend
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter a username."),
    description: Yup.string()
      .required("Please enter an email.")
      .min(6, "Password must be at least 12 characters")
      .max(40, "Password must not exceed 40 characters")
    // file: Yup.mixed()
    //   .required("File is required")
    //   .test("fileSize", "The file is too large", (value) => {
    //     if (!value.length) return true; // attachment is optional
    //     return value[0].size <= 2000000;
    //   })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const submitForm = (data) => {
    setUploading(true);
    submitNft(data).then(
      (res) => {
        if (res.hash.length) {
          const options = { state: { message: "Success!" } };
          navigate("/dashboard", options);
          setUploading(false);
          resetFile(); //currently using this t
          return;
        } else {
          setUploading(false);
          return;
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setUploading(false);
      }
    );
  };
  return (
    <>
      {uploading ? (
        <LoadingScreen />
      ) : (
        <CreateForm
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
          submitForm={submitForm}
        />
      )}
    </>
  );
};

export default MintNft;
