
            import Vue from 'vue'
            import Router from 'vue-router'
            import Project from '@/views/main/page/project.vue'
            import Library from '@/views/main/page/library.vue'
            import Configuration from '@/views/main/page/configuration.vue'
            import Main from '@/views/main/index.vue'
            
            Vue.use(Router)
            export default new Router({
                routes: [
                    {
            name: 'main',
            path: '/main/index',
            component: Main,
            children: [{
            name: 'project',
            path: '/main/page/project',
            component: Project
        },{
            name: 'library',
            path: '/main/page/library',
            component: Library
        },{
            name: 'configuration',
            path: '/main/page/configuration',
            component: Configuration
        },]
        },
                ]
            })
        