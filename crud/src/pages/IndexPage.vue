<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="posts"
      :columns="colunas"
      row-key="name"
    >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)" />
      </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import postsService from '../services/posts';
import { useQuasar } from 'quasar';

  const posts = ref([])
  const { list, remove } = postsService()
  const colunas = [
    {name: 'id', field: 'id', label: 'id', sortable: true},
    {name: 'title', field: 'title', label: 'Título', sortable: true},
    {name: 'author', field: 'author', label: 'Autor', sortable: true},
    {name: 'content', field: 'content', label: 'Conteúdo', sortable: true},
    {name: 'actions', field: 'actions', label: 'Ações', sortable: true}
  ]

    const $q = useQuasar()

    onMounted(async () => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.error (error)
      }
    }

    const handleDeletePost = async (id: any) => {
      try {
        $q.dialog({
        title: 'Deletar?',
        message: 'Deseja deletar esse post?',
        cancel: true,
        persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({message: 'Apagado com sucesso', icon: 'check', color: 'positive'})
          await getPosts()
        })
      } catch (error) {
        $q.notify({message: 'Erro ao apagar', icon: 'times', color: 'negative'})
      }
    }

defineComponent({
  name: 'IndexPage',
  setup () {
    return {
      posts,
      colunas,
      handleDeletePost
    }
  }
});

</script>
