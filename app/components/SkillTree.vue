<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    success: {
      get: () => this.$store.state.status.success,
      set: value => this.$store.dispatch("clearError")
    },
    error: {
      get: () => this.$store.state.status.error,
      set: value => this.$store.dispatch("clearError")
    },
    ...mapGetters(["skills", "loading"])
  },
  watch: {
    page: "skills"
  },
  methods: {
    getSkills: () => this.$store.dispatch("getSkills")
  }
};
</script>

<style lang="stylus" scoped>
#keep {
    .card__title {
        display: block;
    }

    .headline {
        a {
            color: rgba(0, 0, 0, 0.87);
            text-decoration: none;
        }
    }

    .v-spinner {
        text-align: center;
    }

    .noRecipes {
        position: absolute;
        right: 0;
        left: 0;
        text-align: center;
        height: auto;
        top: 60px;
        bottom: 0;
    }

    .recipes-pagination {
        margin-top: 80px;
    }

    .pagination >>> li > a.pagination__item--active {
        background: #FFC107;
        color: #000;
        font-weight: bold;
    }
}
</style>
