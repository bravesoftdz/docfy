const { Project, Section } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [Section],
        where: {
          UserId: req.session.user.id,
        },
      });

      const user = {
        name: req.session.user.name,
      };

      return res.render('projects/index', { projects, user });
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Projeto criado com sucesso!');

      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const projectId = req.params.id;
      const project = await Project.findById(projectId);

      const sections = await Section.findAll({
        where: {
          ProjectId: projectId,
        },
      });

      return res.render('projects/show', {
        project,
        sections,
        projectId,
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Projeto deletado com sucesso!');

      return res.redirect('/app/projects');
    } catch (err) {
      return next(err);
    }
  },
};
