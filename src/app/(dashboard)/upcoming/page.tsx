"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import axiosInstance from "@/utils/apis";
import { Flex, Card, Avatar, List } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { EditOutlined, HeartOutlined } from "@ant-design/icons";
import Loading from "@/components/Loading";
import { DataProps } from "@/utils/propTypes";
import ReplyModal from "@/components/ReplyModal";
import Styles from "@/styles/app/dashboard/content.module.scss";

const { Meta } = Card;

function UpComing() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [data, setData] = useState<DataProps>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [isModal, setIsModal] = useState<boolean>(false);
  const imgRef = useRef(null);

  const loadMoreData = () => {
    axiosInstance
      .get("/movie/upcoming", {
        params: {
          page: pageNumber,
        },
      })
      .then((res) => {
        let newArr: any = [];
        if (res.data && pageNumber === 1) {
          res.data.results.map((data: any) => {
            return newArr.push({ ...data, is_like: false });
          });
          let currentData = { ...res.data, results: [...newArr] };
          setData(currentData);
        } else {
          res.data.results.map((data: any) => {
            return newArr.push({ ...data, is_like: false });
          });
          setData({
            ...data,
            results: [...data.results, ...newArr],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likeHandler = (idx: number) => {
    let prevData: any = { ...data };
    prevData.results[idx]["is_like"] = !prevData.results[idx]["is_like"];
    return setData(prevData);
  };

  useEffect(() => {
    loadMoreData();
  }, [pageNumber]);

  return (
    <Suspense fallback={<Loading />}>
      <InfiniteScroll
        dataLength={data.results.length}
        next={() => {
          setPageNumber(pageNumber + 1);
        }}
        hasMore={pageNumber < data.total_pages}
        loader={<Loading />}
        pullDownToRefreshThreshold={50}
      >
        <Flex vertical align="center" className={Styles.flex_main}>
          <ReplyModal isOpen={isModal} setIsOpen={setIsModal} />
          <List
            dataSource={data.results}
            renderItem={(item: any, idx: number) => (
              <Card
                className={Styles.card}
                bordered={false}
                actions={[
                  <EditOutlined key="edit" onClick={() => setIsModal(true)} />,
                  <HeartOutlined
                    key="like"
                    onClick={() => likeHandler(idx)}
                    style={{ color: item.is_like ? "red" : "" }}
                  />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                  }
                  title={item.original_title}
                  description={item.overview}
                />
                <Flex vertical align="center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500` + item.poster_path}
                    style={{ marginTop: 30 }}
                    alt={item.original_title}
                    width={460}
                    height={690}
                    ref={imgRef}
                    priority
                  />
                </Flex>
              </Card>
            )}
          />
        </Flex>
      </InfiniteScroll>
    </Suspense>
  );
}

export default React.memo(UpComing);
