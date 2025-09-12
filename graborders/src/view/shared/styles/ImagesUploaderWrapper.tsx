import styled from "styled-components";

const ImagesUploaderWrapper = styled.div`
  .img-card:hover .img-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .img-buttons {
    display: none;
    position: relative;
    bottom: 2.1rem;
    width: calc(100px);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
i{
font-size:24px}


  .upload-card {
  border: 1px dashed #555;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  min-height: 220px; /* ensures consistent height */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  color: #bbb;
  margin-bottom: 20px;
}

.upload-card .upload-area {
  cursor: pointer;
}

.uploaded-box {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 220px; /* same as upload card */
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.uploaded-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* keeps aspect ratio and fills box */
  border-radius: 8px;
}

.img-buttons {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  padding: 4px;
}

`;

export default ImagesUploaderWrapper;
