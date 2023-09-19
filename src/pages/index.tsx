import { useStore } from "@/models/RootStore"
import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styles from '@/styles/Home.module.css';
import QuestionView from "@/components/Question";
import QuestionsSkeleton from "@/components/QuestionsSkeleton";

const Home = observer((props) => {
  const { questionStore } = useStore();
  const { fetchQuestions, questions, state } = questionStore;

  useEffect(() => {
    void fetchQuestions();
  }, []);

  return (
    <>
      <Grid container spacing={4} className={styles.gridContainer}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Simple testing app</Typography>
        </Grid>
        {state === 'pending' && (
          <QuestionsSkeleton />
        )}
        {state === 'done' && questions?.map((question, idx) => (
          <QuestionView key={question.id} question={question} count={idx + 1} />
        ))}
      </Grid>
    </>
  )
});

export default Home;
