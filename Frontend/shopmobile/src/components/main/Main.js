import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";

export default function Main() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  });

  const today = new Date();

  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1; // 월
  const date = today.getDate(); // 날짜
  const newDate = year + "/" + month + "/" + date;

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={10} mt={4}>
          <CssBaseline />
          <Card sx={{ border: 1, borderRadius: 4 }}>
            <CardHeader
              title="오늘의 특가 상품"
              subheader={newDate}
              sx={{ textAlign: "center", borderBottom: 1, backgroundColor:'#ff8c8c' }}
            />
            {/* 이미지는 관리자 페이지에서 넣기로 약속 */}
            <CardMedia
              component="img"
              image="/app/images/discount.jpg"
              alt="discount"
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={10} mt={4} mb={2}>
          <CssBaseline />
          <Card sx={{ border: 1, borderRadius: 4 }}>
            <CardHeader
              title="내일의 특가 상품"
              sx={{ textAlign: "center", borderBottom: 1, backgroundColor:"#90caf9" }}
            />
            <CardMedia
              component="img"
              width='100'
              height='210'
              image="/app/images/tomorrow.jpg"
              alt="discount"
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
