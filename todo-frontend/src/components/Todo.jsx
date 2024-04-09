import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  ExclamationCircleTwoTone,
  LikeOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Popconfirm, Spin, Tooltip, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  createData,
  findAllData,
  removeAll,
  removeData,
  upDateData,
} from "../services/todo.service";

const Todo = () => {
  const dispatch = useDispatch();
  const dataTodo = useSelector((state) => state.todo.data);
  const error = useSelector((state) => state.todo.error);
  const status = useSelector((state) => state.todo.status);
  const inputRef = useRef(null);
  const [note, setNote] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    await dispatch(findAllData());
  };

  useEffect(() => {
    inputRef.current.focus();
    setIsLoading(true);
    loadData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setCount(dataTodo?.data?.filter((note) => note.completed == false)?.length);
  }, [dataTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note === "") {
      message.success({
        content: "Thêm mới nội dung",
        icon: <ExclamationCircleTwoTone twoToneColor="#ff0000" />,
      });
      return;
    }
    const newNote = {
      id: uuidv4(),
      userId: uuidv4(),
      title: note,
      completed: false,
    };
    try {
      await dispatch(createData(newNote));
      setIsLoading(true);
      loadData();
      setIsLoading(false);
      if (status == "Failed!" || error) {
        message.error("Lỗi thêm mới");
      } else {
        message.success("Thêm mới thành công");
      }
      setNote("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error({
          content: "Nội dung đã tồn tại",
          icon: <ExclamationCircleTwoTone twoToneColor="#ff0000" />,
        });
      } else {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    await dispatch(removeData(id));
    setIsLoading(true);
    await loadData();
    setIsLoading(false);
    message.success({
      content: "Xoá thành công",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const handleUpdateCompleted = async (id) => {
    try {
      await dispatch(upDateData(id));
      setIsLoading(true);
      await loadData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearAll = async () => {
    await dispatch(removeAll());
    setIsLoading(true);
    await loadData();
    setIsLoading(false);
    message.success("Xoá thành công");
  };

  const listNote = dataTodo?.data?.map((note, index) => (
    <div
      key={index}
      className={`w-full flex items-center justify-between gap-2 hover:opacity-70 p-2 bg-slate-100`}
    >
      <div
        key={note.id}
        className="flex-1 flex gap-6 items-center justify-between"
      >
        <p
          className={`text-wrap ${
            note.completed ? "line-through" : "no-underline"
          }
        `}
        >
          {index + 1}: {note.title}
        </p>
        {note.completed ? (
          <Tooltip placement="left" title="Hoàn tác" color="green">
            <button onClick={() => handleUpdateCompleted(note.id)}>
              <div className="px-1 border cursor-pointer border-[#00CC00] rounded-md">
                <LikeOutlined className="text-[#00CC00]" />
              </div>
            </button>
          </Tooltip>
        ) : (
          <Tooltip placement="left" title="Xong" color="red">
            <button onClick={() => handleUpdateCompleted(note.id)}>
              <div className="px-1 border cursor-pointer border-[#ff0000] rounded-md">
                <LikeOutlined className="text-[#ff0000]" />
              </div>
            </button>
          </Tooltip>
        )}
      </div>
      <Tooltip placement="right" title="Xoá" color="red">
        <Popconfirm
          title="Xoá note của bạn"
          placement="left"
          onConfirm={() => handleDelete(note?.id)}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
          okType="danger"
        >
          <div className="px-1 border cursor-pointer border-red-600 rounded-md">
            <DeleteTwoTone twoToneColor="#ff0000" />
          </div>
        </Popconfirm>
      </Tooltip>
    </div>
  ));

  return (
    <>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="fixed bg-white py-5 top-0 w-full md:w-[50%] flex items-center justify-center gap-2"
        >
          <input
            className="flex-1 border border-black px-2 py-2 md:py-1 rounded-lg"
            type="text"
            id="inputNote"
            placeholder="Ghi chú"
            ref={inputRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            type="default"
            className="hidden md:block border-blue-600 bg-blue-500 text-white"
          >
            Thêm
          </Button>
        </form>
        <Tooltip title="Thêm mới">
          <label
            htmlFor="inputNote"
            className="fixed z-[99] text-white bottom-10 right-[5%] w-[90%] h-[40px] flex justify-between items-center px-[5%] md:hidden p-2 md:px-4 text-base md:text-sm rounded-full hover:bg-blue-500 bg-blue-600"
          >
            <div>Thêm ghi chú mới</div>
            <div>
              <PlusCircleTwoTone />
            </div>
          </label>
        </Tooltip>
        <div className="w-full md:w-[50%] flex justify-between items-center  mt-[70px]">
          <p className="text-black">You have {count} pending task</p>
          <Popconfirm
            title="Xoá toàn bộ danh sách của bạn"
            placement="left"
            onConfirm={() => handleClearAll()}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Button className="bg-red-500 text-white">Clear all</Button>
          </Popconfirm>
        </div>
        <div className="w-full md:w-[50%] mt-5 flex flex-col gap-1 items-center justify-center">
          {isLoading ? (
            <div className="fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="animate-spin w-10 h-10 border-4 border-purple-700 bg-transparent rounded-full border-b-white"></div>
            </div>
          ) : (
            <>{listNote}</>
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
